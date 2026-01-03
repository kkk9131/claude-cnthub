---
name: cnthub:export
description: Export current session observations to a new session with AI summary
---

# /cnthub:export - Export Observations Command

This command exports observations from the current session, grouping them logically and creating new sessions with AI-generated summaries.

## Usage

When the user invokes `/cnthub:export`, follow this workflow:

### Step 1: Get Current Session ID

First, determine the current session. Use the environment or context to identify the active Claude Code session ID.

If you cannot determine the current session, ask the user:

```
I need to know which session to export from. Please provide:
- The session ID (e.g., ch_ss_0001), or
- Run this command within an active cnthub session
```

### Step 2: Fetch Observations

Use the MCP tool `list_observations` to get all observations from the session:

```
Tool: list_observations
Arguments: { "sessionId": "<session_id>", "limit": 100 }
```

### Step 3: Analyze and Group Observations

Analyze the observations and group them by logical work units. Consider:

- Related file changes (same feature/module)
- Sequential tool uses that form a coherent task
- Decisions and their implementations
- Error handling and fixes

Create logical groups such as:
- Feature implementations
- Bug fixes
- Refactoring
- Documentation updates
- Test additions

### Step 4: Display Groups for Selection

Present the groups to the user in a numbered, selectable format:

```markdown
## Export: Current Session Observations

I analyzed the observations and identified the following logical groups:

### Detected Groups

1. **[Group Name]** (X observations)
   - observation_id_1: Brief description
   - observation_id_2: Brief description
   ...

2. **[Group Name]** (X observations)
   - observation_id_3: Brief description
   - observation_id_4: Brief description
   ...

3. **[Group Name]** (X observations)
   - observation_id_5: Brief description
   ...

---

**Select groups to export** (e.g., "1", "1,3", "all"):
```

Format each group entry with:
- Group number for selection
- Descriptive group name (inferred from observations)
- Observation count
- Brief list of included observations

### Step 5: Wait for User Selection

Wait for the user to specify which groups they want to export. Accept:
- Single number: `1`
- Multiple numbers: `1,2,3` or `1, 2, 3`
- All groups: `all`
- None (cancel): `none` or `cancel`

### Step 6: Export Selected Groups

For each selected group, use the MCP tool `export_observations`:

```
Tool: export_observations
Arguments: {
  "sourceSessionId": "<session_id>",
  "observationIds": ["ch_ob_0001", "ch_ob_0002", ...],
  "groupName": "Group Name"
}
```

### Step 7: Display Results

After successful export, display the results:

```markdown
## Export Complete

Successfully exported X group(s) as new sessions:

### 1. [Group Name]
- **Session ID**: ch_ss_XXXX
- **Observations**: X items
- **Summary**: [AI-generated short summary]

### 2. [Group Name]
- **Session ID**: ch_ss_YYYY
- **Observations**: X items
- **Summary**: [AI-generated short summary]

---

These sessions are now available for context injection via `/cnthub:get`.
```

### Step 8: Context Removal Confirmation

After displaying the export results, ask the user if they want to remove the exported observations from the current context:

```markdown
---

## Context Management

Would you like to remove the exported observations from the current context?

- **Yes**: The remaining context will be saved and can be restored after `/clear`
- **No**: Keep the exported observations in the current context (copy only)

Note: This helps reduce context size when working on long sessions.
```

Wait for the user's response.

### Step 9: Handle Context Removal Response

#### If User selects "Yes":

1. Identify the **remaining observations** (all observations NOT included in the exported groups)

2. Format the remaining observations as context:

```markdown
<remaining-context>
## Previously in this session

### Observation: {title}
{content}

### Observation: {title}
{content}
...
</remaining-context>
```

3. Save the remaining context to backend using the pending_inject API:

```bash
curl -X POST http://localhost:3048/api/inject/pending \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "<current Claude Code session ID>",
    "context": "<remaining observations formatted as context>"
  }'
```

4. Inform the user:

```markdown
## Context Saved

Remaining context (X observations) has been saved.

**Next steps:**
1. Use `/clear` to reset the conversation and free up context space
2. The remaining context will be **automatically restored** on your next message

The exported sessions are available via `/cnthub:get` for future reference.
```

#### If User selects "No":

Display a simple confirmation:

```markdown
## Export Complete

Your observations have been copied to new sessions. The current context remains unchanged.

Use `/cnthub:get` to inject the exported sessions as context in future work.
```

## Output Format Template

### Group Detection Output

```markdown
## Export: Current Session Observations

I analyzed {totalCount} observations and identified {groupCount} logical groups:

### Detected Groups

{For each group:}
{number}. **{groupName}** ({observationCount} observations)
   {For each observation:}
   - {observationId}: {title}

---

**Select groups to export** (e.g., "1", "1,3", "all"):
```

### Export Result Output

```markdown
## Export Complete

Successfully exported {exportedCount} group(s):

{For each exported group:}
### {number}. {groupName}
- **Session ID**: {newSessionId}
- **Observations**: {count} items
- **Summary**: {shortSummary}

---

These sessions are now available for context injection via `/cnthub:get`.
```

### Context Removal Confirmation Output

```markdown
---

## Context Management

Would you like to remove the exported observations from the current context?

- **Yes**: The remaining context will be saved and can be restored after `/clear`
- **No**: Keep the exported observations in the current context (copy only)

Note: This helps reduce context size when working on long sessions.
```

### Context Saved Output (Yes response)

```markdown
## Context Saved

Remaining context ({remainingCount} observations) has been saved.

**Next steps:**
1. Use `/clear` to reset the conversation and free up context space
2. The remaining context will be **automatically restored** on your next message

The exported sessions are available via `/cnthub:get` for future reference.
```

### Export Only Output (No response)

```markdown
## Export Complete

Your observations have been copied to new sessions. The current context remains unchanged.

Use `/cnthub:get` to inject the exported sessions as context in future work.
```

## Error Handling

- If no observations exist: "No observations found in the current session. Tool uses, decisions, and other activities are recorded as observations during the session."

- If API is unavailable: "cnthub API is not available. Ensure the cnthub server is running on port 3048."

- If export fails for a group: Continue with other groups and note the failure: "Failed to export group 'X': {error message}"

- If user cancels: "Export cancelled. No changes were made."

- If pending inject API fails: "Failed to save remaining context. Your export was successful, but context removal is not available. The exported sessions are still available via `/cnthub:get`."

## Example Conversation

**User**: `/cnthub:export`

**Assistant**: Let me fetch the observations from the current session...

[Calls list_observations tool]

## Export: Current Session Observations

I analyzed 12 observations and identified 3 logical groups:

### Detected Groups

1. **Authentication Implementation** (5 observations)
   - ch_ob_0001: Created auth middleware
   - ch_ob_0002: Added JWT token validation
   - ch_ob_0003: Implemented login endpoint
   - ch_ob_0004: Added password hashing
   - ch_ob_0005: Created auth tests

2. **Database Schema Update** (4 observations)
   - ch_ob_0006: Added users table migration
   - ch_ob_0007: Created user repository
   - ch_ob_0008: Added indexes for performance
   - ch_ob_0009: Updated schema documentation

3. **Error Handling Improvements** (3 observations)
   - ch_ob_0010: Added global error handler
   - ch_ob_0011: Implemented validation errors
   - ch_ob_0012: Added error logging

---

**Select groups to export** (e.g., "1", "1,3", "all"):

**User**: 1,2

**Assistant**: Exporting groups 1 and 2...

[Calls export_observations for each group]

## Export Complete

Successfully exported 2 group(s):

### 1. Authentication Implementation
- **Session ID**: ch_ss_0015
- **Observations**: 5 items
- **Summary**: Implemented JWT-based authentication with middleware, login endpoint, and comprehensive test coverage.

### 2. Database Schema Update
- **Session ID**: ch_ss_0016
- **Observations**: 4 items
- **Summary**: Added users table with optimized indexes and created repository layer for data access.

---

These sessions are now available for context injection via `/cnthub:get`.

---

## Context Management

Would you like to remove the exported observations from the current context?

- **Yes**: The remaining context will be saved and can be restored after `/clear`
- **No**: Keep the exported observations in the current context (copy only)

Note: This helps reduce context size when working on long sessions.

**User**: Yes

**Assistant**: Saving remaining context...

[Calls POST /api/inject/pending with remaining observations]

## Context Saved

Remaining context (3 observations) has been saved.

**Next steps:**
1. Use `/clear` to reset the conversation and free up context space
2. The remaining context will be **automatically restored** on your next message

The exported sessions are available via `/cnthub:get` for future reference.

## Notes

- Observations are **copied** to new sessions, not moved. The original session remains unchanged.
- AI summaries are generated automatically but may fail gracefully (session is still created).
- Exported sessions can be used with `/cnthub:get` for context injection.
- Each exported group becomes a standalone session that can be searched and referenced.
- **Context Removal**: When the user selects "Yes" for context removal:
  - Non-exported observations are saved to the pending inject API
  - The pending context expires after 1 hour if not consumed
  - After `/clear`, the UserPromptSubmit hook automatically restores the remaining context
  - This feature helps manage context size during long development sessions
