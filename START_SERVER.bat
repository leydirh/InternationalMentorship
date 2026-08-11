@echo off
title International Mentorship Server
cd /d "%~dp0"
echo ============================================================
echo Starting International Mentorship Server on http://localhost:3000
echo Close this window or press Ctrl+C to STOP the server.
echo ============================================================
python server.py
pause
