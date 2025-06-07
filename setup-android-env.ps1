# Setup Android Environment Variables for Tauri Development
Write-Host "Setting up Android environment variables..." -ForegroundColor Green

# Set JAVA_HOME
$javaHome = "C:\Program Files\Android\Android Studio\jbr"
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "User")
Write-Host "JAVA_HOME set to: $javaHome" -ForegroundColor Yellow

# Set ANDROID_HOME
$androidHome = "$env:LocalAppData\Android\Sdk"
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidHome, "User")
Write-Host "ANDROID_HOME set to: $androidHome" -ForegroundColor Yellow

# Set NDK_HOME
if (Test-Path "$androidHome\ndk") {
    $ndkVersion = Get-ChildItem -Name "$androidHome\ndk" | Select-Object -Last 1
    $ndkHome = "$androidHome\ndk\$ndkVersion"
    [System.Environment]::SetEnvironmentVariable("NDK_HOME", $ndkHome, "User")
    Write-Host "NDK_HOME set to: $ndkHome" -ForegroundColor Yellow
} else {
    Write-Host "NDK not found. Please install NDK through Android Studio SDK Manager." -ForegroundColor Red
}

# Refresh environment variables for current session
Write-Host "Refreshing environment variables for current session..." -ForegroundColor Green
[System.Environment]::GetEnvironmentVariables("User").GetEnumerator() | % { 
    Set-Item -Path "Env:\$($_.key)" -Value $_.value 
}

# Add Node.js to PATH for current session
$env:PATH += ";C:\Program Files\nodejs"

Write-Host "Environment setup complete!" -ForegroundColor Green
Write-Host "Please restart your terminal or IDE to ensure all changes take effect." -ForegroundColor Cyan

# Verify setup
Write-Host "`nVerifying setup:" -ForegroundColor Green
Write-Host "JAVA_HOME: $env:JAVA_HOME" -ForegroundColor White
Write-Host "ANDROID_HOME: $env:ANDROID_HOME" -ForegroundColor White
Write-Host "NDK_HOME: $env:NDK_HOME" -ForegroundColor White
