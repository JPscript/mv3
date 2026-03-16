---
name: ejercicios-html-guiados
description: Genera ejercicios guiados de HTML para principiantes absolutos, con opciones creativas previas, nivel configurable y explicación paso a paso.
user-invokable: true
disable-model-invocation: false
argument-hint: "[modalidad: con-ia|sin-ia] [nivel: basico|medio|avanzado|dios] [objetivo opcional] [tiempo disponible]"
---

# Ejercicios guiados de HTML

## Objetivo
Crear ejercicios de HTML claros, útiles y divertidos para personas sin experiencia previa.

## Modalidad obligatoria
- **sin-ia**: resolver paso a paso sin usar IA, con guía pedagógica detallada.
- **con-ia**: resolver usando IA de forma crítica, con prompts sugeridos + validación manual obligatoria.

## Flujo obligatorio
1. Antes de crear el ejercicio, ofrecer **mínimo 5 opciones** de ejercicio (creativas y útiles).
2. Esperar elección del usuario.
3. Confirmar modalidad (`con-ia` o `sin-ia`) y nivel.
4. Si falta algún dato clave (modalidad, nivel, objetivo/tema o ruta destino), **detenerse y preguntar**.
5. Generar un único ejercicio guiado con pasos detallados.
6. Incluir una **solución completa** paso a paso con explicación del porqué y para qué de cada bloque.

## Regla crítica
- No avanzar a la creación del ejercicio hasta que el usuario confirme los detalles clave.

## Regla anti-solución simple (obligatoria)
- Prohibido entregar soluciones breves o ambiguas.
- La solución debe tener secuencia docente detallada (micro-pasos).
- Cada bloque debe explicar: qué hace, por qué se implementa así y para qué sirve.
- Debe incluir validación intermedia y validación final.
- Si falta detalle, rehacer antes de responder.

## Reglas didácticas
- Explicar cada concepto en lenguaje simple (qué es y para qué sirve).
- No asumir conocimientos previos.
- Incluir comentarios y explicaciones claras en ejemplos.
- Priorizar HTML usado en proyectos reales (semántica, formularios, enlaces, imágenes, tablas cuando aplique).
- Evitar etiquetas raras/poco usadas salvo que el usuario las pida.
- Mantener tono motivador, usando metáforas de construcción (ladrillos) y referencias a Senior Cat cuando ayude.

## Niveles
- **basico**: estructura base, headings, párrafos, listas, enlaces, imágenes.
- **medio**: semántica completa, navegación interna, tablas simples, formularios básicos.
- **avanzado**: formularios más completos, validaciones nativas, accesibilidad básica, organización por secciones.
- **dios**: reto largo con múltiples secciones, criterios estrictos de semántica y calidad, revisión crítica final.

## Formato de salida obligatorio
- Título del ejercicio.
- Objetivo de aprendizaje.
- Prerrequisitos mínimos.
- Pasos guiados (numerados, muy claros).
- Código base comentado.
- Solución final completa (`index.html` y archivos necesarios).
- Explicación por bloques: qué hace, por qué se resuelve así y para qué sirve.
- Guía de verificación final (cómo comprobar que funciona).
- Retos extra opcionales.
- Checklist de validación.
- Errores frecuentes y cómo corregirlos.
- Cierre motivador.

## Diferencia por modalidad
- Si es `sin-ia`: más pistas progresivas y razonamiento paso a paso.
- Si es `con-ia`: incluir prompt inicial, 2-3 iteraciones de prompt y checklist de revisión manual.
