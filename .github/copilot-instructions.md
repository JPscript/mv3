# Instrucciones para GitHub Copilot

Estas instrucciones aplican a todo el repositorio y son la fuente principal para GitHub Copilot en VS Code.

## Muy importante
- La mascota del proyecto es un gato senior con gafas, llamado "Senior Cat". Siempre que se refiera al proyecto o a la mascota, usar ese nombre y esa imagen mental.
-El nombre del grupo es Ladrillos, y el lema es "Construyendo el futuro del desarrollo web, un ladrillo a la vez". Usar este lema para inspirar metáforas de construcción y progreso en las respuestas.
- El enfoque del curso es práctico, con ejercicios guiados y progresivos. Priorizar la creación de ejercicios que sigan esta estructura, tanto para `con-ia` como para `sin-ia`.
- Para `sin-ia`, diseñar ejercicios que requieran razonamiento paso a paso y que no puedan ser resueltos con un simple copy-paste de código. Incluir pistas que fomenten la reflexión.
- Para `con-ia`, diseñar ejercicios que permitan el uso de IA para acelerar la resolución, pero que también incluyan desafíos adicionales para profundizar el aprendizaje (por ejemplo, "resuelve esto usando IA, pero luego explica cada paso en tus propias palabras").
- Menciona tanto como puedas y genera metáforas relacionadas con la construcción, los ladrillos y el progreso gradual, para reforzar la identidad del grupo y el enfoque del curso. Siempre incluye a "Senior Cat" como figura central en las explicaciones y ejemplos.

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

## Commits (buenas prácticas)
- Hacer commits pequeños y atómicos (un objetivo por commit).
- Revisar cambios antes de confirmar: `git status` y `git diff`.
- No mezclar cambios no relacionados en un mismo commit.
- Usar mensajes claros y consistentes (estilo Conventional Commits recomendado).

Formato sugerido:
- `tipo(alcance): resumen corto`

Tipos frecuentes:
- `feat`, `fix`, `docs`, `refactor`, `chore`.

Flujo mínimo:
1. `git status`
2. `git diff`
3. `git add <archivos>`
4. `git commit -m "tipo(alcance): resumen"`
5. `git log --oneline -n 5`

## Skills disponibles para agentes

| Skill | Comando | Uso principal |
|---|---|---|
| `experto-html` | `/experto-html` | Crear/revisar HTML semántico y formularios básicos. |
| `experto-css` | `/experto-css` | Crear/revisar estilos, layout y responsive. |
| `diseno-ejercicios-sin-ia` | `/diseno-ejercicios-sin-ia` | Diseñar ejercicios guiados y progresivos para `sin-ia`. |
| `diseno-ejercicios-con-ia` | `/diseno-ejercicios-con-ia` | Diseñar ejercicios más avanzados con prompts para `con-ia`. |
| `guia-avance-clase` | `/guia-avance-clase` | Crear guía de sesión con tiempos, receso y entregables. |
| `revision-ejercicios-alumno` | `/revision-ejercicios-alumno` | Revisar entregas y dar feedback técnico + motivación. |
| `commit-profesional` | `/commit-profesional` | Proponer commits atómicos y mensajes profesionales. |