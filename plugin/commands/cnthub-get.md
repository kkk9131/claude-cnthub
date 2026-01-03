---
name: cnthub:get
description: Retrieve and inject context from past completed sessions
---

# /cnthub:get - Context Retrieval Command

This command retrieves context from past completed and merged sessions and injects it into the current conversation.

## Usage

When the user invokes `/cnthub:get`, follow this workflow:

### Step 1: Fetch Available Sessions

Use the MCP tool `list_sessions` to get completed and merged sessions:

```
Tool: list_sessions
Arguments: { "limit": 20 }
```

Note: Filter to show only `completed` and `merged` status sessions.

### Step 2: Display Session List

Present the sessions as a numbered list in this format:

```
# Available Sessions

Select sessions to inject context from:

1. [2026-01-02] [completed] Session Name - Brief summary preview...
2. [2026-01-01] [merged] Another Session - Brief summary preview...
3. [2025-12-31] [completed] Third Session - Brief summary preview...

Enter session numbers (e.g., "1", "1,2,3", or "all"):
```

Format each entry as:
- `[DATE]` - Session creation date (YYYY-MM-DD)
- `[STATUS]` - Session status (`completed` or `merged`)
- `Session Name` - The session name
- `Brief summary...` - First 50 characters of summary preview (if available)

### Step 3: Wait for User Selection

Wait for the user to specify which sessions they want. Accept:
- Single number: `1`
- Multiple numbers: `1,2,3` or `1, 2, 3`
- Range: `1-3`
- All sessions: `all`

### Step 4: Retrieve Session Details

For each selected session, use the MCP tool `inject_context`:

```
Tool: inject_context
Arguments: { "sessionIds": ["ch_ss_0001", "ch_ss_0002"], "format": "summary" }
```

### Step 5: Output Context

Format and display the retrieved context:

```markdown
# Related Context

## Session: {Session Name} ({Date})
{Summary content}

Key Decisions:
- Decision 1
- Decision 2

Files Modified:
- path/to/file1.ts
- path/to/file2.ts

---

## Session: {Another Session Name} ({Date})
{Summary content}
...
```

## Output Format Template

```markdown
# Related Context

## Session: {name} ({createdAt})
{shortSummary}

Key Decisions:
{keyDecisions as bullet list}

Files Modified:
{filesModified as bullet list}

---
```

## Error Handling

- If no completed or merged sessions exist, inform the user: "No completed or merged sessions found. Complete a session first to use context injection."
- If API is unavailable, inform the user: "cnthub API is not available. Ensure the cnthub server is running on port 3048."
- If a specific session fails to load, continue with other sessions and note the failure.

## Example Conversation

User: `/cnthub:get`