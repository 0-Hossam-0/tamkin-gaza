#!/bin/bash
set -e

# Default settings
BASE_BRANCH="dev"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
NEW_BRANCH="local-update-$TIMESTAMP"

# Get commit message
if [ -z "$1" ]; then
  echo "✏️ Enter commit message:"
  read COMMIT_MSG
else
  COMMIT_MSG="$1"
fi

if [ -z "$COMMIT_MSG" ]; then
  echo "❌ Error: Commit message is required."
  exit 1
fi

echo "📦 Adding changes..."
git add -A

echo "💾 Committing to current branch..."
if git diff --cached --quiet; then
  echo "⚠️ No changes to commit"
else
  git commit -m "$COMMIT_MSG"
fi

echo "🌱 Creating feature branch: $NEW_BRANCH"
git checkout -b "$NEW_BRANCH"

echo "⬆️ Pushing branch to origin..."
git push -u origin "$NEW_BRANCH"

echo "🔗 Checking for base branch '$BASE_BRANCH' on origin..."
if ! git ls-remote --exit-code --heads origin "$BASE_BRANCH" > /dev/null; then
  echo "⚠️ Warning: Base branch '$BASE_BRANCH' does not exist on origin."
  echo "Pushing your local '$BASE_BRANCH' branch to origin first..."
  git push origin "$BASE_BRANCH"
fi

echo "🔗 Creating Pull Request..."
gh pr create \
  --base "$BASE_BRANCH" \
  --head "$NEW_BRANCH" \
  --title  "Automated PR from script"  \
  --body "$COMMIT_MSG"

echo "✅ DONE - PR created successfully"