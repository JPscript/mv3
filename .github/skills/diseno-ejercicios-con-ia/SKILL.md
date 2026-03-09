---
name: diseno-ejercicios-con-ia
description: Diseña ejercicios más avanzados para la carpeta con-ia, incluyendo prompts sugeridos y criterios de calidad para guiar el trabajo con IA.
user-invokable: true
disable-model-invocation: false
argument-hint: "[tema] [resultado esperado] [nivel] [ruta clase referencia opcional]"
---

# Diseño de ejercicios con IA

## Objetivo
Crear ejercicios para `con-ia` con mayor reto técnico, aprovechando prompts e iteración guiada.

## Cuándo usar
- Al preparar la versión avanzada de un tema ya visto en `sin-ia`.
- Cuando quieras que el alumnado practique prompting + revisión crítica.

## Procedimiento
1. Si se indica una clase de referencia (por ejemplo `jp/bitacora/CLASE1.md`), leerla para extraer:
   - contenidos cubiertos,
   - dudas del grupo,
   - predicción para la siguiente clase.
2. Tomar el tema y definir nivel objetivo (intermedio o avanzado) en continuidad con la clase de referencia.
3. Proponer 3 a 5 ejercicios con reto superior al bloque `sin-ia`.
4. Incluir para cada ejercicio:
   - objetivo técnico,
   - prompt inicial recomendado,
   - cómo iterar el prompt,
   - checklist de validación del resultado,
   - errores frecuentes a evitar.
5. Pedir reflexión final: qué generó la IA, qué se aceptó y qué se corrigió manualmente.
6. Crear los materiales dentro de una carpeta por tema con formato `N-tema` (ejemplo: `1-html-bases`) dentro de `jp/con-ia/html`.

## Regla de progresión
- Aumentar complejidad respecto a la clase anterior.
- Evitar repetir soluciones triviales ya vistas.
- Mantener foco en aprendizaje crítico del uso de IA (no solo copiar/pegar).

## Restricciones
- No sustituir el criterio del alumnado: siempre validar y ajustar el resultado.
- No generar soluciones cerradas sin explicar decisiones.
- Mantener formato breve y accionable.
- No dejar ejercicios sueltos en la raíz de `html`; usar siempre carpeta temática `N-tema`.

## Regla anti-solución simple (obligatoria)
- La solución nunca puede ser “resumen corto”.
- Debe incluir paso a paso docente + explicación de qué/por qué/para qué de cada bloque.
- Debe incluir validación manual y justificación de cambios sobre la salida de IA.
- Si está incompleta o superficial, se rehace antes de entregar.

## Salida esperada
- Propuesta de ejercicios para `con-ia` con prompts listos para usar.
- Bloque de evaluación rápida para revisar calidad técnica y comprensión.
- Solución final completa y explicada como clase guiada.

## Ejemplo de uso
- "Tema: Formularios HTML y validación básica. Resultado esperado: formulario de registro semántico con validaciones nativas. Nivel: inicial-intermedio. Usa como referencia `jp/bitacora/CLASE1.md` y crea ejercicios para `jp/con-ia/html/2-formularios-html`."
