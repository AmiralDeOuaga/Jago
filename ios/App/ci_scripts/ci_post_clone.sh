#!/bin/sh

set -e

# Install Homebrew if not present
if ! command -v brew &> /dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install Node.js 22 (stable LTS) — évite les bugs de npm avec Node 26+
if ! command -v node &> /dev/null; then
  brew install node@22
  brew link node@22 --force
elif node --version | grep -q "^v2[6-9]\|^v[3-9][0-9]"; then
  # Node 26+ détecté → installer Node 22 LTS à la place
  brew install node@22
  brew link node@22 --force --overwrite
fi

# Go to project root
cd "$CI_PRIMARY_REPOSITORY_PATH"

# Install node_modules so @capacitor/push-notifications local path exists
# before Xcode Cloud resolves Swift Package dependencies
npm install --legacy-peer-deps
