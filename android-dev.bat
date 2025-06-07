@echo off
echo Setting up Android environment variables...

REM Set environment variables for this session
set "JAVA_HOME=C:\Program Files\Android\Android Studio\jbr"
set "ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk"
set "NDK_HOME=%LOCALAPPDATA%\Android\Sdk\ndk\27.0.12077973"

REM Add Node.js to PATH
set "PATH=%PATH%;C:\Program Files\nodejs"

echo JAVA_HOME: %JAVA_HOME%
echo ANDROID_HOME: %ANDROID_HOME%
echo NDK_HOME: %NDK_HOME%

echo.
echo Running Tauri Android dev...
npx tauri android dev

pause
