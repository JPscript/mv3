---
name: diseno-ejercicios-sin-ia
description: Diseña ejercicios sencillos y progresivos para la carpeta sin-ia, con enfoque guiado para alumnado que resuelve sin ayuda de IA.
user-invokable: true
disable-model-invocation: false
argument-hint: "[tema] [nivel] [duración] [ruta clase referencia opcional]"
---

# Diseño de ejercicios sin IA

## Objetivo
Crear material práctico para `sin-ia` con dificultad baja-media, pasos claros y foco en fundamentos.

## Cuándo usar
- Al preparar una clase nueva (tema 1, tema 2, etc.).
- Cuando necesites ejercicios base para aprendizaje progresivo.

## Procedimiento
1. Si se indica una clase de referencia (por ejemplo `jp/bitacora/CLASE1.md`), leerla para extraer:
   - tema trabajado,
   - nivel alcanzado,
   - dudas frecuentes.
2. Definir el tema y subtemas mínimos de la clase actual en continuidad con la clase de referencia.
3. Proponer 3 a 5 ejercicios incrementales (de muy fácil a moderado).
4. Incluir para cada ejercicio:
   - objetivo,
   - requisitos mínimos,
   - pistas breves (sin dar solución completa),
   - criterio de finalización.
5. Mantener lenguaje simple y orientación docente.
6. Entregar también una mini guía de trabajo en clase (orden recomendado y tiempo estimado por ejercicio).
7. Crear los materiales dentro de una carpeta por tema con formato `N-tema` (ejemplo: `1-html-bases`) dentro de `jp/sin-ia/html`.

## Regla de progresión
- No repetir exactamente los ejercicios de la clase anterior.
- Subir dificultad de forma suave y acumulativa.
- Asegurar que los ejercicios sean resolubles sin IA.

## Restricciones
- No usar dependencias ni frameworks no solicitados.
- No sobrecomplicar el contenido.
- Mantener cambios mínimos y documentos breves.
- No dejar ejercicios sueltos en la raíz de `html`; usar siempre carpeta temática `N-tema`.

## Salida esperada
- Propuesta de ejercicios para `sin-ia` lista para copiar a la carpeta del tema.
- Formato claro para que el alumnado pueda avanzar de forma autónoma.

## Ejemplo de uso
- "Tema: Formularios HTML básicos. Nivel: inicial. Duración: 16:30-20:30. Usa como referencia `jp/bitacora/CLASE1.md` y crea ejercicios para `jp/sin-ia/html/2-formularios-html`."
