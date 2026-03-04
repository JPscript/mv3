---
name: commit-profesional
description: Ayuda a preparar commits con buenas prácticas profesionales, revisando cambios, agrupación atómica y mensaje claro en formato recomendado.
user-invokable: true
disable-model-invocation: false
argument-hint: "Documento HTML sin comentarios"
---
# Skill: Comentador de HTML para principiantes

## Objetivo
Guiar la creación de commits claros, pequeños y consistentes para mantener un historial limpio y fácil de revisar.

## Cuándo usar
- Antes de confirmar cambios en Git.
- Cuando haya dudas sobre cómo agrupar archivos o redactar el mensaje.
- Al cerrar una tarea de clase o una mejora concreta del repo.


## ¿Qué hace el skill?

1. Recibe un bloque de código HTML o accede a un documento de HTML (puede ser una página completa o un snippet pequeño de código reutilizable).
2. Recorre el código y etiqueta por etiqueta, inserta comentarios HTML (`<!-- ... -->`) que:
   - Definen la función de la etiqueta.
   - Señalan la importancia de la semántica.
   - Describen los atributos usados y sus valores.
   - Indican la jerarquía (padres/hijos, contenedores).
   - Aclaran cualquier comportamiento especial (formularios, enlaces, imágenes).
3. Explica, en un lenguaje sencillo, términos nuevos o conceptos clave.
4. Devuelve el mismo código original con los comentarios intercalados.

---

## Uso sugerido

- **Entrada**: tu código HTML sin comentarios.
- **Salida**: el mismo código con comentarios detallados.
- **Formato**: conservar indentación y estructura; los comentarios deben ser lo más claros y breves pero suficientemente descriptivos.


## Procedimiento
1. Revisar el objetivo del cambio y los archivos modificados.
2. Verificar si los cambios pertenecen al mismo propósito.
3. Si hay mezcla de temas, proponer separar en 2 o más commits.
4. Sugerir tipo de commit (`feat`, `fix`, `docs`, `refactor`, `chore`).
5. Redactar mensaje en formato:
   - `tipo(alcance): resumen corto`
6. Si hace falta, proponer cuerpo de commit con:
   - qué se cambió,
   - por qué,
   - impacto esperado.
7. Confirmar checklist final antes del commit.

## Checklist previo
- [ ] El commit representa un único objetivo.
- [ ] Se revisó `git status`.
- [ ] Se revisó `git diff`.
- [ ] El mensaje es claro y específico.
- [ ] No se incluyen archivos no relacionados.

## Salida esperada
- Propuesta de agrupación de archivos por commit.
- Mensaje(s) de commit listos para usar.
- Comandos sugeridos (`git add`, `git commit`) acordes al objetivo.

## Ejemplo de uso
- "Objetivo: documentar IA del repo y crear skill de commits. Archivos: README.md y .github/skills/commit-profesional/SKILL.md. Tipo sugerido: docs y feat."
