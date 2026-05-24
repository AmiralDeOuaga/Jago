#!/bin/sh

set -e

# Install Homebrew if not present
if ! command -v brew &> /dev/null; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Ensure Node 22 LTS (avoid Node 26+ npm bugs)
if ! command -v node &> /dev/null; then
  brew install node@22
  brew link node@22 --force
elif node --version | grep -q "^v2[6-9]\|^v[3-9][0-9]"; then
  brew install node@22
  brew link node@22 --force --overwrite
fi

# Go to project root (two levels up from ci_scripts)
cd "$CI_PRIMARY_REPOSITORY_PATH"

# Install dependencies
npm install --legacy-peer-deps

# Build the web app
npm run build

# Sync to iOS
npx cap sync ios

# Restore Package.swift — single package, no nested LocalCapacitorPlugins dependency
# (cap sync overwrites Package.swift with node_modules paths)
PACKAGE_SWIFT="$CI_PRIMARY_REPOSITORY_PATH/ios/App/CapApp-SPM/Package.swift"

echo "Restoring Package.swift (merged targets, single capacitor-swift-pm dependency)..."
cat > "$PACKAGE_SWIFT" << 'PKGEOF'
// swift-tools-version: 5.9
import PackageDescription

// DO NOT MODIFY THIS FILE - managed by Capacitor CLI commands
let package = Package(
    name: "CapApp-SPM",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapApp-SPM",
            targets: ["CapApp-SPM"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", exact: "8.3.1"),
        .package(url: "https://github.com/google/GoogleSignIn-iOS", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "PushNotificationsPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "../../LocalPackages/ios/Sources/PushNotificationsPlugin"
        ),
        .target(
            name: "SignInWithApple",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "../../LocalPackages/ios/Sources/SignInWithApple"
        ),
        .target(
            name: "CapApp-SPM",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .byName(name: "PushNotificationsPlugin"),
                .byName(name: "SignInWithApple"),
                .product(name: "GoogleSignIn", package: "GoogleSignIn-iOS")
            ]
        )
    ]
)
PKGEOF

echo "Package.swift restored successfully"
