#!/usr/bin/env bash
set -euo pipefail


BASE_DIR="./ci-runner"
APP_DIR="$BASE_DIR/app/backend"
TEST_DIR="$BASE_DIR/tests/backend-tests"

APP_REPO="https://github.com/code-with-ShubhamS/backend.git"
TEST_REPO="https://github.com/code-with-ShubhamS/backend-tests.git"

BRANCH="main"


# PREPARE WORKSPACE
echo "🧹 Cleaning workspace"
rm -rf "$APP_DIR" "$TEST_DIR"
mkdir -p "$APP_DIR" "$TEST_DIR"


# CLONE REPOS
echo "📥 Cloning app repository"
git clone --depth 1 -b "$BRANCH" "$APP_REPO" "$APP_DIR"

echo "📥 Cloning test repository"
git clone --depth 1 -b "$BRANCH" "$TEST_REPO" "$TEST_DIR"

# INSTALL APP DEPENDENCIES
echo "📦 Installing app dependencies"
npm ci

# ENV required by tests
export APP_DIR
export NODE_ENV=production
export PORT=5000


# RUN EXTERNAL TESTS
echo "🧪 Running external tests"
echo "$TEST_DIR"
node "$TEST_DIR/run-tests.js"

# SUCCESS
echo "Tests completed successfully"
