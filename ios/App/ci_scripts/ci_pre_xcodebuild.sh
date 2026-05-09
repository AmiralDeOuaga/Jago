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
  echo "Re-adding GoogleSignIn-iOS and fixing Package.swift..."

  # Add GoogleSignIn-iOS dependency after the last .package line
  sed -i '' 's|.package(name: "CapacitorPushNotifications", path: "../../../node_modules/@capacitor/push-notifications")|.package(name: "CapacitorPushNotifications", path: "../../../node_modules/@capacitor/push-notifications"),\n        .package(url: "https://github.com/google/GoogleSignIn-iOS", from: "8.0.0")|' "$PACKAGE_SWIFT"

  # Add GoogleSignIn product after CapacitorPushNotifications product
  sed -i '' 's|.product(name: "CapacitorPushNotifications", package: "CapacitorPushNotifications")|.product(name: "CapacitorPushNotifications", package: "CapacitorPushNotifications"),\n                .product(name: "GoogleSignIn", package: "GoogleSignIn-iOS")|' "$PACKAGE_SWIFT"

  echo "Package.swift updated with GoogleSignIn-iOS"
fi
