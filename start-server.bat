@echo off
echo ========================================
echo   GIF Converter - ローカルサーバー起動
echo ========================================
echo.

REM Try Node.js http-server first
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Node.js が見つかりました。サーバーを起動します...
    echo.
    echo ブラウザで http://localhost:8080 を開いてください
    echo 終了するには Ctrl+C を押してください
    echo.
    npx -y http-server -p 8080 -c-1 --cors
    goto :end
)

REM Try Python
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python が見つかりました。サーバーを起動します...
    echo.
    echo ブラウザで http://localhost:8080 を開いてください
    echo 終了するには Ctrl+C を押してください
    echo.
    python -m http.server 8080
    goto :end
)

REM Try py (Windows Python launcher)
where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Python が見つかりました。サーバーを起動します...
    echo.
    echo ブラウザで http://localhost:8080 を開いてください
    echo 終了するには Ctrl+C を押してください
    echo.
    py -m http.server 8080
    goto :end
)

echo.
echo エラー: Node.js または Python が見つかりません。
echo.
echo 以下のいずれかをインストールしてください:
echo   - Node.js: https://nodejs.org/
echo   - Python: https://www.python.org/
echo.
echo または、VS Code の Live Server 拡張機能を使用してください。
echo.
pause

:end
