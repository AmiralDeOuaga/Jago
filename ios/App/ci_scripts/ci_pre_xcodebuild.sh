#!/bin/sh

set -e

# Install Homebrew if not present
if ! command -v brew &> /dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install Node.js if not present
if ! command -v node &> /dev/null; then
  brew install node
fi

# Go to project root (two levels up from ci_scripts)
cd "$CI_PRIMARY_REPOSITORY_PATH"

# Install dependencies
npm install

# Build the web app
npm run build

# Sync to iOS
npx cap sync ios
