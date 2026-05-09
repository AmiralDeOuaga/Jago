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

# Re-add GoogleSignIn-iOS to Package.swift (cap sync overwrites it)
PACKAGE_SWIFT="$CI_PRIMARY_REPOSITORY_PATH/ios/App/CapApp-SPM/Package.swift"
if ! grep -q "GoogleSignIn-iOS" "$PACKAGE_SWIFT"; then
  echo "Re-adding GoogleSignIn-iOS to Package.swift..."
  sed -i '' 's|.package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", exact: "8.3.1")|.package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", exact: "8.3.1"),\n        .package(url: "https://github.com/google/GoogleSignIn-iOS", from: "8.0.0")|' "$PACKAGE_SWIFT"
  sed -i '' 's|.product(name: "Cordova", package: "capacitor-swift-pm")|.product(name: "Cordova", package: "capacitor-swift-pm"),\n                .product(name: "GoogleSignIn", package: "GoogleSignIn-iOS")|' "$PACKAGE_SWIFT"
  echo "Package.swift updated with GoogleSignIn-iOS"
fi
