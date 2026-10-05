@echo off
rem Genera los PDF de todos los temas (carpeta pdf\) y un PDF unico: pdf\temario_completo.pdf
cd /d "%~dp0"
python herramientas\exportar_pdf.py --unir temario_completo.pdf
echo.
pause
