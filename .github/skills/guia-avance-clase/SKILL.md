---
name: guia-avance-clase
description: Genera la guía de avance de una clase con objetivos, secuencia de trabajo, tiempos y entregables para con-ia y sin-ia.
user-invokable: true
disable-model-invocation: false
argument-hint: "[tema] [fecha] [duración] [nivel] [ruta clase anterior opcional]"
---

# Guía de avance de clase

## Objetivo
Producir un documento único de sesión para que el grupo sepa qué hacer, en qué orden y con qué entregables.

## Cuándo usar
- Al inicio de cada clase.
- Al preparar material de planificación semanal.

## Procedimiento
1. Si se proporciona una clase anterior (por ejemplo `jp/bitacora/CLASE1.md`), leerla y extraer:
   - lo trabajado,
   - dificultades,
   - predicción del alumnado para la siguiente clase.
2. Definir objetivo general de la sesión en continuidad con la clase anterior (sin repetir exactamente lo mismo).
3. Dividir la clase en bloques de tiempo (inicio, práctica guiada, **receso 18:00 - 18:30**, práctica autónoma, revisión y cierre).
4. Incluir tareas diferenciadas para:
   - `sin-ia` (fundamentos y pasos guiados),
   - `con-ia` (retos avanzados con prompts).
5. Definir entregables mínimos del día.
6. Añadir checklist de cierre con:
   - evaluación personal de cómo se sintió el alumno en clase,
   - registro de dudas en `DUDAS.md` (si las hay),
   - predicción de lo que cree que verá en la siguiente clase.

## Regla de progresión
- Avanzar siempre en dificultad respecto a la clase anterior.
- Si la clase anterior fue "HTML bases", proponer en la siguiente clase temas como formularios, validaciones básicas y semántica aplicada.
- Mantener equilibrio: `sin-ia` más guiado y `con-ia` más retador.

## Plantilla mínima sugerida
- Tema y objetivo del día.
- Plan por bloques de tiempo.
- Actividades `sin-ia`.
- Actividades `con-ia`.
- Entregables (incluyendo predicción de la siguiente clase).
- Autoevaluación y próximos pasos.

## Salida esperada
- Guía clara, breve y lista para compartir con el alumnado.

## Ejemplo de uso
- "Tema: Formularios HTML. Fecha: 2026-03-03. Duración: 16:30-20:30. Nivel: inicial. Usa como referencia `jp/bitacora/CLASE1.md` y genera `jp/bitacora/CLASE2.md` con progresión de contenidos."
