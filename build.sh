#!/bin/bash

# Build script for Kick Real Chat Viewers Extension
# Creates production-ready packages for different browsers

echo "🔧 Building Kick Real Chat Viewers Extension..."
echo "================================================"

# Create build directory
BUILD_DIR="builds"
echo "📁 Creating build directory..."
mkdir -p $BUILD_DIR

# Chrome/Edge/Brave/Opera build (Manifest V3)
echo "📦 Building for Chrome/Edge/Brave/Opera..."
CHROME_DIR="$BUILD_DIR/chrome-edge-brave-opera"
mkdir -p $CHROME_DIR

# Copy core files
cp manifest.json $CHROME_DIR/
cp -r src/ $CHROME_DIR/
cp -r assets/ $CHROME_DIR/
cp LICENSE $CHROME_DIR/
cp README.md $CHROME_DIR/

# Create zip package
cd $CHROME_DIR
zip -r ../kick-real-viewer-counter-chromium-v1.2.zip ./*
cd ../..

echo "✅ Chrome/Edge/Brave/Opera package created: builds/kick-real-viewer-counter-chromium-v1.2.zip"

# Firefox build (Manifest V2)
echo "🦊 Building for Firefox..."
FIREFOX_DIR="$BUILD_DIR/firefox"
mkdir -p $FIREFOX_DIR

# Copy core files
cp manifests/manifest-firefox.json $FIREFOX_DIR/manifest.json
cp -r src/ $FIREFOX_DIR/
cp -r assets/ $FIREFOX_DIR/
cp LICENSE $FIREFOX_DIR/
cp README.md $FIREFOX_DIR/

# Create zip package
cd $FIREFOX_DIR
zip -r ../kick-real-viewer-counter-firefox-v1.2.zip ./*
cd ../..

echo "✅ Firefox package created: builds/kick-real-viewer-counter-firefox-v1.2.zip"

# Development build (includes all files)
echo "🛠️ Creating development package..."
DEV_DIR="$BUILD_DIR/development"
mkdir -p $DEV_DIR

cp -r ./* $DEV_DIR/ 2>/dev/null || true
rm -rf $DEV_DIR/.git 2>/dev/null || true
rm -rf $DEV_DIR/builds 2>/dev/null || true

cd $DEV_DIR
zip -r ../kick-real-viewer-counter-development-v1.2.zip ./*
cd ../..

echo "✅ Development package created: builds/kick-real-viewer-counter-development-v1.2.zip"

echo ""
echo "🎉 Build complete!"
echo "📁 Generated packages:"
echo "   - builds/kick-real-viewer-counter-chromium-v1.2.zip (Chrome/Edge/Brave/Opera)"
echo "   - builds/kick-real-viewer-counter-firefox-v1.2.zip (Firefox)"
echo "   - builds/kick-real-viewer-counter-development-v1.2.zip (Full source)"
echo ""
echo "🚀 Ready for distribution!"
