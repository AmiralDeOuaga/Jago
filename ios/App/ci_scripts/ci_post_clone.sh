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

# Go to project root
cd "$CI_PRIMARY_REPOSITORY_PATH"

# Install node_modules so @capacitor/push-notifications local path exists
# before Xcode Cloud resolves Swift Package dependencies
npm install
