#!/bin/bash
# Post-edit hook: Auto-format TypeScript/JavaScript files

# Read input from stdin
INPUT=$(cat)

# Extract file path from tool input
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Exit if no file path
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only format TypeScript/JavaScript files
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.md)
    # Check if prettier is available
    if command -v prettier &> /dev/null || [ -f "$CLAUDE_PROJECT_DIR/node_modules/.bin/prettier" ]; then
      cd "$CLAUDE_PROJECT_DIR" 2>/dev/null || exit 0

      # Run prettier (suppress errors for non-existent files)
      if [ -f "$FILE_PATH" ]; then
        npx prettier --write "$FILE_PATH" 2>/dev/null || true
      fi
    fi
    ;;
esac

exit 0
