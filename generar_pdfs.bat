@echo off
rem Genera los PDF de todos los temas: blanco y negro en pdf\ y color en pdf\color\ (con un PDF unico de cada: temario_completo.pdf)
cd /d "%~dp0"
python herramientas\exportar_pdf.py --unir temario_completo.pdf
python herramientas\exportar_pdf.py --color --unir temario_completo.pdf
echo.
pause
