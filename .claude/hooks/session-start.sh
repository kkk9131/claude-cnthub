#!/bin/bash
# Session start hook: Load context and set up environment

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Output context information to Claude via CLAUDE_OUTPUT_FILE
if [ -n "$CLAUDE_OUTPUT_FILE" ]; then
  {
    echo "# Session Context Loaded"
    echo ""

    # Check for pending tasks in Plans.md
    if [ -f "$PROJECT_DIR/Plans.md" ]; then
      PENDING_COUNT=$(grep -c "^\s*- \[ \]" "$PROJECT_DIR/Plans.md" 2>/dev/null || echo "0")
      IN_PROGRESS=$(grep -c "^\s*- \[.\].*in progress\|^\s*- \[>\]" "$PROJECT_DIR/Plans.md" 2>/dev/null || echo "0")
      echo "## Task Status"
      echo "- Pending tasks: $PENDING_COUNT"
      echo "- In progress: $IN_PROGRESS"
      echo ""
    fi

    # Check for recent phase summaries
    SUMMARIES_DIR="$PROJECT_DIR/.claude/memory/phase-summaries"
    if [ -d "$SUMMARIES_DIR" ]; then
      LATEST_SUMMARY=$(ls -t "$SUMMARIES_DIR"/*.md 2>/dev/null | head -1)
      if [ -n "$LATEST_SUMMARY" ]; then
        echo "## Latest Phase Summary"
        echo "File: $(basename "$LATEST_SUMMARY")"
        echo ""
      fi
    fi

    # Check git status
    if [ -d "$PROJECT_DIR/.git" ]; then
      CHANGED_FILES=$(cd "$PROJECT_DIR" && git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
      if [ "$CHANGED_FILES" -gt 0 ]; then
        echo "## Git Status"
        echo "- Uncommitted changes: $CHANGED_FILES files"
        echo ""
      fi
    fi

  } > "$CLAUDE_OUTPUT_FILE"
fi

exit 0
