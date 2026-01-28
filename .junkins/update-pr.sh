#!/bin/bash

set -euo pipefail

BITBUCKET_KEY=${1:-}

if [[ -z "$BITBUCKET_KEY" ]]; then
  echo "[PR Bot] Bitbucket api key is required." >&2
  exit 1
fi

BITBUCKET_API="https://git.rakuten-it.com/rest/api/1.0/projects/ICWDCDG/repos/sidekick/pull-requests"
GIT_COMMIT=${GIT_COMMIT:-}

if [[ -z "$GIT_COMMIT" ]]; then
  echo "[PR Bot] GIT_COMMIT env var is required." >&2
  exit 1
fi

echo "[PR Bot] Fetching PR for commit: $GIT_COMMIT"
PR_JSON=$(curl -sSL -H "Content-Type: application/json" -H "Authorization: Bearer $BITBUCKET_KEY" "$BITBUCKET_API")

PR_ID=$(echo "$PR_JSON" | jq -r --arg commit "$GIT_COMMIT" '.values[] | select(.fromRef.latestCommit == $commit) | .id')
PR_VERSION=$(echo "$PR_JSON" | jq -r --arg commit "$GIT_COMMIT" '.values[] | select(.fromRef.latestCommit == $commit) | .version')
PR_REVIEWERS=$(echo "$PR_JSON" | jq -c --arg commit "$GIT_COMMIT" '.values[] | select(.fromRef.latestCommit == $commit) | .reviewers')
PR_DESC=$(echo "$PR_JSON" | jq -r --arg commit "$GIT_COMMIT" '.values[] | select(.fromRef.latestCommit == $commit) | .description')

if [[ -z "$PR_ID" ]]; then
  echo "[PR Bot] No PR found for commit: $GIT_COMMIT" >&2
  exit 0
fi

description="${PR_DESC%%#### PR Bot*}"
description+=$'\n#### PR Bot\n\n'

LINT_STATUS=${LINT_STATUS:-}
LINT_ERROR=${LINT_ERROR:-}
UNIT_TEST_STATUS=${UNIT_TEST_STATUS:-}
UNIT_TEST_ERROR=${UNIT_TEST_ERROR:-}
BUILD_STATUS=${BUILD_STATUS:-}
BUILD_ERROR=${BUILD_ERROR:-}
SB_BUILD_STATUS=${SB_BUILD_STATUS:-}
SB_BUILD_ERROR=${SB_BUILD_ERROR:-}

description+="| Step      | Status | Error |"
description+="
|-----------|--------|-------|"
description+="
| Lint      | $LINT_STATUS | $LINT_ERROR |"
description+="
| Unit Test | $UNIT_TEST_STATUS | $UNIT_TEST_ERROR |"
description+="
| Build (Bundle)    | $BUILD_STATUS | $BUILD_ERROR |"
description+="
| Build (Storybook) | $SB_BUILD_STATUS | $SB_BUILD_ERROR |"

UPDATE_BODY=$(jq -n --arg version "$PR_VERSION" --argjson reviewers "$PR_REVIEWERS" --arg description "$description" '{version: ($version|tonumber), reviewers: $reviewers, description: $description}')

UPDATE_URL="$BITBUCKET_API/$PR_ID"
echo "[PR Bot] Updating PR #$PR_ID.."
curl -sSL -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer $BITBUCKET_KEY" -d "$UPDATE_BODY" "$UPDATE_URL"
echo "[PR Bot] PR updated."
