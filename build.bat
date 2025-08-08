@echo off
echo 🔧 Building Kick Real Chat Viewers Extension...
echo ================================================

:: Create build directory
set BUILD_DIR=builds
echo 📁 Creating build directory...
if not exist %BUILD_DIR% mkdir %BUILD_DIR%

:: Chrome/Edge/Brave/Opera build (Manifest V3)
echo 📦 Building for Chrome/Edge/Brave/Opera...
set CHROME_DIR=%BUILD_DIR%\chrome-edge-brave-opera
if not exist %CHROME_DIR% mkdir %CHROME_DIR%

:: Copy core files
copy manifest.json %CHROME_DIR%\
xcopy src %CHROME_DIR%\src\ /E /I /Q
xcopy assets %CHROME_DIR%\assets\ /E /I /Q
copy LICENSE %CHROME_DIR%\
copy README.md %CHROME_DIR%\

echo ✅ Chrome/Edge/Brave/Opera package created in: %CHROME_DIR%

:: Firefox build (Manifest V2)
echo 🦊 Building for Firefox...
set FIREFOX_DIR=%BUILD_DIR%\firefox
if not exist %FIREFOX_DIR% mkdir %FIREFOX_DIR%

:: Copy core files
copy manifests\manifest-firefox.json %FIREFOX_DIR%\manifest.json
xcopy src %FIREFOX_DIR%\src\ /E /I /Q
xcopy assets %FIREFOX_DIR%\assets\ /E /I /Q
copy LICENSE %FIREFOX_DIR%\
copy README.md %FIREFOX_DIR%\

echo ✅ Firefox package created in: %FIREFOX_DIR%

:: Development build (includes all files)
echo 🛠️ Creating development package...
set DEV_DIR=%BUILD_DIR%\development
if not exist %DEV_DIR% mkdir %DEV_DIR%

xcopy . %DEV_DIR%\ /E /I /Q /EXCLUDE:build-exclude.txt

echo ✅ Development package created in: %DEV_DIR%

echo.
echo 🎉 Build complete!
echo 📁 Generated packages:
echo    - %CHROME_DIR% (Chrome/Edge/Brave/Opera)
echo    - %FIREFOX_DIR% (Firefox)
echo    - %DEV_DIR% (Full source)
echo.
echo 🚀 Ready for distribution!
echo 💡 Tip: You can manually zip these folders for easy sharing
pause
