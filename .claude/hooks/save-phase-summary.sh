#!/bin/bash
# Save phase summary helper script
# Usage: save-phase-summary.sh <phase-number> <phase-name>

PHASE_NUM="${1:-1}"
PHASE_NAME="${2:-unnamed}"
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
SUMMARIES_DIR="$PROJECT_DIR/.claude/memory/phase-summaries"
OUTPUT_FILE="$SUMMARIES_DIR/phase-${PHASE_NUM}-${PHASE_NAME}.md"

# Create directory if needed
mkdir -p "$SUMMARIES_DIR"

# Generate template
cat > "$OUTPUT_FILE" << 'EOF'
# Phase PHASE_NUM: PHASE_NAME

Date: DATE

## Completed Tasks
- [ ] Task 1
- [ ] Task 2

## Technical Decisions
- Decision 1: Reason

## Learnings
- Learning 1

## Issues Encountered
- None

## Next Actions
- Action 1

## Files Changed
<!-- List main files modified in this phase -->

## Review Summary
<!-- Paste review results here -->
EOF

# Replace placeholders
sed -i '' "s/PHASE_NUM/$PHASE_NUM/g" "$OUTPUT_FILE"
sed -i '' "s/PHASE_NAME/$PHASE_NAME/g" "$OUTPUT_FILE"
sed -i '' "s/DATE/$(date '+%Y-%m-%d %H:%M')/g" "$OUTPUT_FILE"

echo "Created: $OUTPUT_FILE"
