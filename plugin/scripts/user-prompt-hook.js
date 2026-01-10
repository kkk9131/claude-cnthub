#!/usr/bin/env node
/**
 * User Prompt Submit Hook
 *
 * Called when user submits a prompt in Claude Code.
 * On first message:
 * 1. Generate session name from message content
 * 2. Search related sessions and inject context
 * 3. Check for pending inject and inject remaining context
 *
 * Input (stdin JSON):
 * - session_id: string
 * - transcript_path: string
 * - cwd: string
 * - permission_mode: string
 * - prompt: string (user's message, 公式仕様)
 * - hook_event_name: "UserPromptSubmit"
 *
 * Output (stdout):
 * - Plain text or JSON with additionalContext field
 *
 * Note: stderr is used for logging only
 */

const {
  readHookContext,
  validateHookContext,
  sendToAPI,
  fetchWithTimeout,
  API_URL,
  getErrorMessage,
  log,
  logError,
} = require("./hook-utils");

/**
 * Check if this is a cnthub command (should be skipped)
 * @param {string} message - User message
 * @returns {boolean}
 */
function isCnthubCommand(message) {
  if (!message || typeof message !== "string") {
    return false;
  }
  const trimmed = message.trim();
  return trimmed.startsWith("/cnthub") || trimmed.startsWith("/cnthub:");
}

/**
 * Generate session name from first message
 * @param {string} sessionId - Session ID (Claude UUID)
 * @param {string} message - User's first message
 * @returns {Promise<{name: string, cnthubSessionId: string}|null>} Generated name and cnthub session ID, or null on failure
 */
async function generateSessionName(sessionId, message) {
  try {
    const response = await sendToAPI(
      `/api/sessions/${sessionId}/generate-name`,
      { message }
    );

    if (!response.ok) {
      log(`[cnthub] Failed to generate session name: ${response.status}`);
      return null;
    }

    const result = await response.json();
    return {
      name: result.name || null,
      cnthubSessionId: result.sessionId || null,
    };
  } catch (error) {
    log(`[cnthub] Error generating session name: ${getErrorMessage(error)}`);
    return null;
  }
}

/**
 * Update session name
 * @param {string} sessionId - Session ID
 * @param {string} name - New session name
 * @returns {Promise<boolean>} Success status
 */
async function updateSessionName(sessionId, name) {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/api/sessions/${sessionId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      log(`[cnthub] Failed to update session name: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    log(`[cnthub] Error updating session name: ${getErrorMessage(error)}`);
    return false;
  }
}

/**
 * Search related sessions and get context
 * @param {string} query - Search query (user's message)
 * @returns {Promise<{contextText: string, sessionsUsed: number}|null>}
 */
async function searchRelatedContext(query) {
  try {
    const response = await sendToAPI("/api/search/context", {
      query,
      maxSessions: 5,
      maxTokens: 4000,
      minRelevanceScore: 0.3,
    });

    if (!response.ok) {
      // 503 means semantic search is not available (no VOYAGE_API_KEY)
      if (response.status === 503) {
        log("[cnthub] Semantic search not available (no VOYAGE_API_KEY)");
        return null;
      }
      log(`[cnthub] Failed to search related context: ${response.status}`);
      return null;
    }

    const result = await response.json();
    return {
      contextText: result.contextText || "",
      sessionsUsed: result.sessionsUsed || 0,
    };
  } catch (error) {
    log(`[cnthub] Error searching related context: ${getErrorMessage(error)}`);
    return null;
  }
}

/**
 * Search for failed sessions (has_issues=true) related to the query
 * @param {string} query - Search query (user's message)
 * @returns {Promise<Array<{sessionId: string, sessionName: string, shortSummary: string, relevanceScore: number, issueType?: string}>|null>}
 */
async function searchFailedSessions(query) {
  try {
    const response = await sendToAPI("/api/search/issues", {
      query,
      limit: 3,
      minRelevanceScore: 0.4,
    });

    if (!response.ok) {
      // 503 means semantic search is not available (no VOYAGE_API_KEY)
      if (response.status === 503) {
        return null;
      }
      log(`[cnthub] Failed to search failed sessions: ${response.status}`);
      return null;
    }

    const result = await response.json();
    return result.results || [];
  } catch (error) {
    log(`[cnthub] Error searching failed sessions: ${getErrorMessage(error)}`);
    return null;
  }
}

/**
 * Save failed session suggestions for later approval
 * @param {string} claudeSessionId - Claude session ID
 * @param {Array<{sessionId: string, sessionName: string, shortSummary: string, relevanceScore: number, issueType?: string}>} sessions - Suggested sessions
 * @returns {Promise<boolean>} Success status
 */
async function saveSuggest(claudeSessionId, sessions) {
  try {
    const response = await sendToAPI("/api/inject/suggest", {
      claudeSessionId,
      suggestedSessions: sessions,
    });

    if (!response.ok) {
      log(`[cnthub] Failed to save suggest: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    log(`[cnthub] Error saving suggest: ${getErrorMessage(error)}`);
    return false;
  }
}

/**
 * Format CLI notification for failed session suggestions
 * @param {Array<{sessionId: string, sessionName: string, shortSummary: string, relevanceScore: number, issueType?: string}>} sessions
 * @returns {string}
 */
function formatSuggestNotification(sessions) {
  const issueTypeLabels = {
    error_loop: "同じエラーの繰り返し",
    edit_loop: "同じファイルを何度も編集",
    test_failure_loop: "テスト失敗ループ",
    rollback: "変更のロールバック",
    other: "その他の問題",
  };

  const lines = [
    "---",
    "# [cnthub] 関連する失敗セッションが見つかりました",
    "",
    "以下の過去の失敗事例が現在のタスクに関連している可能性があります:",
    "",
  ];

  sessions.forEach((session, index) => {
    const score = Math.round(session.relevanceScore * 100);
    const issueLabel = session.issueType
      ? issueTypeLabels[session.issueType] || session.issueType
      : "不明";
    lines.push(`${index + 1}. **${session.sessionName}** (関連度: ${score}%)`);
    lines.push(`   - 問題タイプ: ${issueLabel}`);
    if (session.shortSummary) {
      const summary =
        session.shortSummary.length > 80
          ? session.shortSummary.substring(0, 80) + "..."
          : session.shortSummary;
      lines.push(`   - ${summary}`);
    }
    lines.push("");
  });

  lines.push(
    "`/cnthub:approve` を実行すると、これらのセッションがコンテキストに追加されます。"
  );
  lines.push("`/cnthub:dismiss` で提案を無視します。");
  lines.push("---");

  return lines.join("\n");
}

/**
 * Get pending inject for session
 * @param {string} sessionId - Session ID
 * @returns {Promise<string|null>} Pending context or null
 */
async function getPendingInject(sessionId) {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/api/inject/pending/${sessionId}`,
      { method: "GET" }
    );

    if (response.status === 404) {
      // No pending inject - this is normal
      return null;
    }

    if (!response.ok) {
      log(`[cnthub] Failed to get pending inject: ${response.status}`);
      return null;
    }

    const result = await response.json();
    return result.context || null;
  } catch (error) {
    log(`[cnthub] Error getting pending inject: ${getErrorMessage(error)}`);
    return null;
  }
}

/**
 * Get context from UI-connected sessions
 * @param {string} sessionId - Claude session ID (UUID)
 * @returns {Promise<string|null>} Connected sessions context or null
 */
async function getConnectedSessionsContext(sessionId) {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/api/inject/connected/${sessionId}`,
      { method: "GET" }
    );

    if (!response.ok) {
      log(`[cnthub] Failed to get connected sessions: ${response.status}`);
      return null;
    }

    const result = await response.json();

    // Check if any sessions are connected
    if (!result.connected || result.sessionCount === 0) {
      return null;
    }

    log(`[cnthub] Found ${result.sessionCount} connected sessions from UI`);
    return result.context || null;
  } catch (error) {
    log(`[cnthub] Error getting connected sessions: ${getErrorMessage(error)}`);
    return null;
  }
}

/**
 * Delete pending inject after successful injection
 * @param {string} sessionId - Session ID
 * @returns {Promise<boolean>} Success status
 */
async function deletePendingInject(sessionId) {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/api/inject/pending/${sessionId}`,
      { method: "DELETE" }
    );

    if (response.status === 404) {
      // Already deleted or expired - this is fine
      return true;
    }

    if (!response.ok) {
      log(`[cnthub] Failed to delete pending inject: ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    log(`[cnthub] Error deleting pending inject: ${getErrorMessage(error)}`);
    return false;
  }
}

/**
 * Check if this is the first message in the session
 * @param {string} sessionId - Session ID
 * @returns {Promise<boolean>} True if first message
 */
async function isFirstMessage(sessionId) {
  try {
    // Get session to check if it has a name set
    // If name is default (starts with "Session" or empty), it's likely first message
    const response = await fetchWithTimeout(
      `${API_URL}/api/sessions/${sessionId}`,
      { method: "GET" }
    );

    if (!response.ok) {
      // Session might not exist yet, treat as first message
      return true;
    }

    const session = await response.json();

    // If session has no name or default name, treat as first message
    if (!session.name || session.name.startsWith("Session ")) {
      return true;
    }

    return false;
  } catch (error) {
    // On error, assume first message to be safe
    log(`[cnthub] Error checking first message: ${getErrorMessage(error)}`);
    return true;
  }
}

async function main() {
  try {
    const context = await readHookContext();
    if (!context || !validateHookContext(context)) {
      process.exit(0);
    }

    const { session_id: sessionId, prompt } = context;
    // 公式仕様では "prompt" フィールド（後方互換のため message もサポート）
    const message = prompt || context.message;

    // Skip if message is empty
    if (!message || typeof message !== "string" || !message.trim()) {
      log("[cnthub] Empty message, skipping");
      process.exit(0);
    }

    // Skip cnthub commands
    if (isCnthubCommand(message)) {
      log("[cnthub] cnthub command detected, skipping context injection");
      process.exit(0);
    }

    const additionalContextParts = [];

    // Check if this is the first message
    const firstMessage = await isFirstMessage(sessionId);

    if (firstMessage) {
      log("[cnthub] First message detected, processing...");

      // 1. Generate and update session name
      const result = await generateSessionName(sessionId, message);
      if (result && result.name && result.cnthubSessionId) {
        const updated = await updateSessionName(
          result.cnthubSessionId,
          result.name
        );
        if (updated) {
          log(`[cnthub] Session name updated: ${result.name}`);
        }
      }

      // 2. Search related sessions and get context
      const relatedContext = await searchRelatedContext(message);
      if (relatedContext && relatedContext.contextText) {
        log(`[cnthub] Found ${relatedContext.sessionsUsed} related sessions`);
        additionalContextParts.push(relatedContext.contextText);
      }

      // 3. Search for failed sessions (negative learning)
      const failedSessions = await searchFailedSessions(message);
      if (failedSessions && failedSessions.length > 0) {
        log(`[cnthub] Found ${failedSessions.length} related failed sessions`);

        // Save suggestions for later approval
        const saved = await saveSuggest(sessionId, failedSessions);
        if (saved) {
          // Add notification to context
          const notification = formatSuggestNotification(failedSessions);
          additionalContextParts.push(notification);
          log(
            "[cnthub] Failed session suggestions saved and notification added"
          );
        }
      }
    }

    // 3. Check for pending inject (includes UI-connected sessions context)
    // Note: Edge creation now adds context to pending_inject, so we only need to check pending
    const pendingContext = await getPendingInject(sessionId);
    if (pendingContext) {
      log("[cnthub] Found pending inject, adding to context");
      additionalContextParts.push(pendingContext);

      // Delete pending inject after successful retrieval (prevents duplicate injection)
      await deletePendingInject(sessionId);
      log("[cnthub] Pending inject consumed and deleted");
    }

    // Output additional context if any
    if (additionalContextParts.length > 0) {
      const combinedContext = additionalContextParts.join("\n\n---\n\n");

      // Output as JSON with additionalContext field
      // Claude Code Hook system expects JSON output
      const output = {
        additionalContext: combinedContext,
      };
      console.log(JSON.stringify(output));
      log(`[cnthub] Context injected (${combinedContext.length} chars)`);
    }

    process.exit(0);
  } catch (error) {
    if (error.name === "AbortError") {
      logError("[cnthub] Request timeout");
    } else {
      logError(`[cnthub] User prompt hook error: ${getErrorMessage(error)}`);
    }
    process.exit(0);
  }
}

main();
