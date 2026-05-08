#!/bin/sh
set -e

echo "=== Post-xcodebuild: Re-signing embedded frameworks ==="

ARCHIVE_PATH="/Volumes/workspace/build.xcarchive"
APP_PATH="$ARCHIVE_PATH/Products/Applications/App.app"
FRAMEWORKS_PATH="$APP_PATH/Frameworks"

# Find the Distribution certificate
CERT=$(security find-identity -v -p codesigning | grep -E "Distribution" | grep -v "EXPIRED" | head -1 | sed -E 's/.*"(.+)".*/\1/')

echo "Certificate found: $CERT"

if [ -z "$CERT" ]; then
    echo "No distribution certificate found, skipping re-sign"
    exit 0
fi

if [ -d "$FRAMEWORKS_PATH" ]; then
    echo "Re-signing frameworks in: $FRAMEWORKS_PATH"
    for framework in "$FRAMEWORKS_PATH"/*.framework; do
        if [ -e "$framework" ]; then
            echo "Re-signing: $framework"
            codesign --force --sign "$CERT" --preserve-metadata=identifier,entitlements "$framework"
        fi
    done
    echo "Re-signing complete"
else
    echo "No Frameworks directory found at: $FRAMEWORKS_PATH"
fi
