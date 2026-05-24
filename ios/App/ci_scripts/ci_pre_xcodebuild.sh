#!/bin/sh

# Everything is already done in ci_post_clone.sh:
# - npm install, npm run build, cap sync, Package.swift restore
# This script is intentionally minimal.

echo "ci_pre_xcodebuild: setup already completed in ci_post_clone"
