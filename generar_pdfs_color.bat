@echo off
rem Genera solo los PDF a color de todos los temas en pdf\color\ (con un PDF unico: temario_completo.pdf)
cd /d "%~dp0"
python herramientas\exportar_pdf.py --color --unir temario_completo.pdf
echo.
pause
