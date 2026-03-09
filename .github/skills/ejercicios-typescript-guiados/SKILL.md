---
name: ejercicios-typescript-guiados
description: Genera ejercicios guiados de TypeScript para principiantes absolutos, con opciones creativas previas, nivel configurable y modalidad con-ia/sin-ia.
user-invokable: true
disable-model-invocation: false
argument-hint: "[modalidad: con-ia|sin-ia] [nivel: basico|medio|avanzado|dios] [tema opcional] [tiempo disponible]"
---

# Ejercicios guiados de TypeScript

## Objetivo
Aprender TypeScript desde cero con ejercicios claros, útiles y progresivos, entendiendo cómo mejorar JavaScript con tipado estático.

## Flujo obligatorio
1. Ofrecer **mínimo 5 opciones** de ejercicio (creativas y útiles) antes de generar contenido.
2. Esperar elección del usuario.
3. Confirmar modalidad (`con-ia` o `sin-ia`) y nivel (`basico|medio|avanzado|dios`).
4. Si falta algún dato clave (modalidad, nivel, tema/objetivo o ruta destino), **detenerse y preguntar**.
5. Entregar un ejercicio guiado paso a paso.
6. Incluir una **solución completa** con tipado final y explicación por bloques.

## Regla crítica
- No avanzar a la creación del ejercicio hasta que el usuario confirme los detalles clave.

## Regla anti-solución simple (obligatoria)
- Nunca entregar una solución sin explicación de tipos.
- Detallar paso a paso docente: definición de tipos, uso, validación y beneficios.
- Para cada bloque: qué tipa, por qué se tipa así y para qué evita errores reales.
- Incluir verificación de tipos y ejecución.
- Si no está a nivel profesor, rehacer.

## Modalidad obligatoria
- **sin-ia**: resolver manualmente con explicación detallada y razonamiento paso a paso.
- **con-ia**: resolver con apoyo de IA (prompts + iteraciones), validando y corrigiendo manualmente el resultado.

## Reglas didácticas
- No asumir conocimientos previos de TypeScript.
- Explicar términos clave de forma simple (tipo, interfaz, inferencia, unión, clase, genéricos).
- Priorizar características usadas en proyectos reales.
- Evitar complejidad rara o poco común salvo petición explícita.
- Mantener ejemplos concretos y fáciles de ejecutar.
- Usar tono motivador y progresivo (construcción por ladrillos y referencia a Senior Cat cuando ayude).

## Niveles
- **basico**: tipos primitivos, funciones tipadas, arrays y objetos simples.
- **medio**: interfaces, type aliases, uniones, opcionales, narrowing básico.
- **avanzado**: clases, utilidades de tipos, genéricos sencillos, organización modular.
- **dios**: mini proyecto tipado de extremo a extremo con validaciones y refactor guiado.

## Formato de salida obligatorio
- Opciones iniciales de ejercicio.
- Ejercicio elegido + objetivo de aprendizaje.
- Prerrequisitos mínimos.
- Pasos guiados (numerados y claros).
- Código comentado por bloques.
- Solución final completa (archivos/código final).
- Explicación por bloque: qué hace, por qué se tipa así y para qué sirve.
- Guía de verificación de tipos y ejecución.
- Checklist de validación.
- Errores frecuentes y cómo corregirlos.
- Reto extra opcional para subir de nivel.
- Cierre motivador.

## Diferencia por modalidad
- Si es `sin-ia`: incluir más pistas progresivas y ejercicios de razonamiento de tipos.
- Si es `con-ia`: incluir prompt inicial, 2-3 iteraciones sugeridas y checklist de revisión manual de tipos.
