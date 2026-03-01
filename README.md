# Master Frontend - Estructura de trabajo

Repositorio de la materia de **Programación Front-end** del máster.
Cada alumno trabaja en su carpeta personal con dos enfoques:
- `con-ia`: ejercicios resueltos usando IA (por ejemplo, GitHub Copilot).
- `sin-ia`: ejercicios resueltos sin ayuda de IA.

## Estructura por alumno

1. Crear una carpeta personal en minúsculas (ej.: `jp`, `jose-luis`, `joselu`).
2. Dentro, crear:
	- `con-ia`
	- `sin-ia`
	- `bitacora`
	- `requisitos`
3. Dentro de cada una, crear estas subcarpetas:
	- En `con-ia` y `sin-ia`: `html`, `css`, `js`, `ts`, `angular`, `nestjs`
4. En cada subcarpeta, añadir un `README.md` corto explicando qué se estudia ahí.
5. En la raíz de `con-ia` y `sin-ia`, añadir `CONCEPTOS.md` para anotar conceptos clave con definición y metáfora.
6. En `bitacora`, crear un archivo por clase: `CLASE1.md`, `CLASE2.md`, etc., con:
	- resumen de lo visto en clase,
	- predicción de lo que se espera ver al día siguiente.
7. En `requisitos`, documentar instalación y configuración del entorno (`nvm`, `nodejs`, `postgresql` y otros necesarios).

## Objetivo

Comparar el aprendizaje resolviendo prácticas:
- con apoyo de IA,
- y sin apoyo de IA,

manteniendo una bitácora clara de avances y conceptos del curso.

## Plan de clases

El plan detallado (fechas, horarios, enfoque por sesión y cierre final tipo Mission Control) está en:
- `jp/ROADMAP.md`

## Guía de IA del repositorio

- **AGENTS.md**: documento corto de enrutamiento por herramienta (qué archivo usar según Copilot, Claude, Cursor, etc.).
- **.github/copilot-instructions.md**: fuente principal de reglas para GitHub Copilot en VS Code dentro de este repo.
- **Skills**: capacidades reutilizables para tareas concretas (por ejemplo, crear guías de clase, diseñar ejercicios o revisar entregas).

### ¿Copilot lee estos archivos automáticamente?

- En este repo, GitHub Copilot en VS Code toma como referencia principal `.github/copilot-instructions.md` de forma automática.
- `AGENTS.md` se mantiene como índice corto de compatibilidad entre herramientas, no como archivo principal para Copilot.
- Las **skills** en `.github/skills/**/SKILL.md` se detectan para usarlas con `/comando` y también pueden cargarse por relevancia.
- Si algo no aparece en Chat, revisar **Configure Chat > Diagnostics** en VS Code.

### Cómo usar skills en el día a día

1. Abrir Chat de Copilot en VS Code.
2. Escribir `/` y seleccionar la skill (por ejemplo `/guia-avance-clase`).
3. Pasar contexto concreto: tema, nivel, duración y ruta de clase anterior si aplica.
4. Revisar el resultado y pedir iteración (más simple, más avanzado, más breve, etc.).

### Qué poner al crear una skill (obligatorio y recomendado)

**Obligatorio**
- Carpeta: `.github/skills/nombre-skill/`
- Archivo: `SKILL.md`
- Frontmatter YAML con:
	- `name` (debe coincidir con el nombre de la carpeta),
	- `description` (qué hace y cuándo usarla).

**Recomendado**
- `argument-hint` para guiar el prompt.
- `user-invokable: true` para mostrarla en menú `/`.
- `disable-model-invocation: false` para permitir carga automática por relevancia.
- Secciones claras en el cuerpo: objetivo, cuándo usar, pasos, restricciones, salida esperada y ejemplo de uso.
- Recursos opcionales en la misma carpeta (`plantillas`, `ejemplos`, `scripts`).

### Referencias oficiales (qué aprender en cada una)

- **GitHub Copilot docs**: visión general, planes, conceptos de agentes y administración de Copilot.  
	https://docs.github.com/en/copilot
- **Copilot en VS Code (overview)**: uso diario de Copilot en editor, chat, agentes y flujo general en VS Code.  
	https://code.visualstudio.com/docs/copilot/overview
- **Custom instructions**: cómo definir reglas globales del repo (`.github/copilot-instructions.md`).  
	https://code.visualstudio.com/docs/copilot/customization/custom-instructions
- **Agent Skills en VS Code**: estructura exacta de `SKILL.md`, frontmatter, invocación `/` y carga automática.  
	https://code.visualstudio.com/docs/copilot/customization/agent-skills
- **Agent Skills standard**: especificación abierta de skills y portabilidad entre agentes/herramientas.  
	https://agentskills.io/
