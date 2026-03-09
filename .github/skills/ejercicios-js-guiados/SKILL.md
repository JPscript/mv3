---
name: ejercicios-js-guiados
description: Genera ejercicios guiados de JavaScript para principiantes absolutos, con opciones creativas previas, nivel configurable y explicación paso a paso.
user-invokable: true
disable-model-invocation: false
argument-hint: "[modalidad: con-ia|sin-ia] [nivel: basico|medio|avanzado|dios] [tema opcional] [tiempo disponible]"
---

# Ejercicios guiados de JavaScript

## Objetivo
Enseñar JavaScript desde cero con ejercicios progresivos y aplicables a frontend real.

## Modalidad obligatoria
- **sin-ia**: resolver la lógica paso a paso sin asistencia de IA.
- **con-ia**: usar IA para proponer soluciones y luego validarlas/corregirlas manualmente.

## Flujo obligatorio
1. Presentar **mínimo 5 opciones** de ejercicio antes de generar contenido.
2. Esperar selección del usuario.
3. Confirmar modalidad (`con-ia` o `sin-ia`) y nivel.
4. Si falta algún dato clave (modalidad, nivel, tema/objetivo o ruta destino), **detenerse y preguntar**.
5. Entregar ejercicio guiado completo del nivel solicitado.
6. Incluir una **solución completa** paso a paso con explicación de lógica, flujo y decisiones.

## Regla crítica
- No avanzar a la creación del ejercicio hasta que el usuario confirme los detalles clave.

## Regla anti-solución simple (obligatoria)
- Prohibido responder con lógica resumida o sin explicación.
- Exigir guía docente paso a paso de estado, flujo y eventos.
- Explicar cada bloque con enfoque: qué hace, por qué y para qué sirve.
- Incluir casos de prueba manuales mínimos.
- Si queda ambiguo, rehacer la respuesta.

## Reglas didácticas
- Explicar paso a paso variables, lógica y flujo de ejecución.
- No asumir conocimiento de programación previa.
- Usar ejemplos cortos y luego integrar en mini casos reales.
- Priorizar temas comunes: variables, condicionales, bucles, funciones, arrays/objetos, DOM, eventos.
- Evitar APIs raras o patrones demasiado avanzados salvo petición explícita.

## Niveles
- **basico**: variables, condicionales, funciones simples.
- **medio**: arrays/objetos, métodos comunes, eventos DOM básicos.
- **avanzado**: manipulación DOM más completa, validaciones, modularidad simple.
- **dios**: mini proyecto guiado con lógica completa, validaciones y refactor básico.

## Formato de salida obligatorio
- Opciones creativas iniciales.
- Ejercicio final con objetivo concreto.
- Guía numerada (pasos + explicación).
- Código comentado por bloques.
- Solución final completa (archivos necesarios).
- Explicación de cada bloque: qué hace, por qué se implementa así y para qué sirve.
- Mini guía de pruebas manuales (casos de prueba).
- Pruebas manuales sugeridas.
- Errores frecuentes + depuración básica.
- Cierre motivador (estilo Senior Cat constructor).

## Diferencia por modalidad
- Si es `sin-ia`: reforzar razonamiento y trazado mental del código.
- Si es `con-ia`: incluir prompts + iteraciones y revisión manual de bugs/lógica.
