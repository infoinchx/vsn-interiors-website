@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js is required. Install Node.js 22 LTS or newer from https://nodejs.org/
 echo After installation, double-click START-WINDOWS.bat again.
 pause
 exit /b 1
)
node serve.mjs
pause
