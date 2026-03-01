# Instrucciones para GitHub Copilot

Estas instrucciones aplican a todo el repositorio y son la fuente principal para GitHub Copilot en VS Code.

## Estilo de código
- Idioma de documentación: español claro, breve y directo.
- Priorizar cambios mínimos y consistentes con la estructura actual del repo.
- Evitar contenido extra no solicitado; confirmar antes de crear secciones nuevas.
- Referencias de estilo: [README.md](README.md), [.github/copilot-instructions.md](.github/copilot-instructions.md).

## Arquitectura
- Repositorio de la materia de Front-end con trabajo por carpeta personal (ejemplo: `jp`).
- Estructura esperada por alumno:
	- `con-ia/` y `sin-ia/` con `html`, `css`, `js`, `ts`, `angular`, `nestjs`.
	- `bitacora/` al mismo nivel, con archivos `CLASE1.md`, `CLASE2.md`, etc.
	- `requisitos/` al mismo nivel para instalación/configuración.
	- `ROADMAP.md` con calendario, horario y foco por sesión.
- Referencias: [README.md](README.md), [jp/ROADMAP.md](jp/ROADMAP.md), [jp/bitacora/README.md](jp/bitacora/README.md).

## Construcción y pruebas
- Actualmente no hay pipeline de build/test a nivel raíz (no hay scripts documentados para ello).
- Comandos reales de entorno documentados en [jp/requisitos/INSTALACION.md](jp/requisitos/INSTALACION.md):
	- `nvm version`
	- `nvm install 22`
	- `nvm use 22`
	- `node -v`
	- `npm -v`
- Verificación de PostgreSQL con `psql` o pgAdmin.

## Convenciones del proyecto
- Cada subcarpeta de `con-ia` y `sin-ia` debe tener `README.md` y `DUDAS.md`.
- En la raíz de `con-ia` y `sin-ia` debe existir `CONCEPTOS.md` (definición + metáfora por concepto).
- Cada archivo de bitácora `CLASEN.md` debe incluir:
	- resumen de lo visto en clase,
	- predicción de temas para la siguiente clase.
- Mantener separación estricta entre trabajo `con-ia` y `sin-ia`.

## Puntos de integración
- Herramientas externas usadas por el curso: GitHub, GitHub Copilot (opcional en `con-ia`), VS Code.
- Dependencias de entorno: `nvm`, `nodejs`, `npm`, `postgresql`, `git`.
- Referencias: [jp/requisitos/README.md](jp/requisitos/README.md), [jp/requisitos/INSTALACION.md](jp/requisitos/INSTALACION.md).

## Seguridad
- No incluir credenciales reales en archivos Markdown (especialmente usuario/contraseña de PostgreSQL).
- Usar solo credenciales locales de desarrollo y evitar publicarlas en el repositorio.

## Alcance
- No crear archivos o secciones fuera del alcance sin confirmación explícita.
- Si un requisito es ambiguo, proponer primero la opción mínima.
- Evitar funcionalidades extra no solicitadas.