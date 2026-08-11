@echo off
title Stop International Mentorship Server
echo ============================================================
echo Stopping Python local server processes on Port 3000...
echo ============================================================
taskkill /F /IM python.exe
echo.
echo Server Stopped Successfully!
pause
