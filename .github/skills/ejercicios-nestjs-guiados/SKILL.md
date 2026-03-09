---
name: ejercicios-nestjs-guiados
description: Genera ejercicios guiados de NestJS para principiantes absolutos, con opciones creativas previas, nivel configurable y explicación paso a paso.
user-invokable: true
disable-model-invocation: false
argument-hint: "[modalidad: con-ia|sin-ia] [nivel: basico|medio|avanzado|dios] [objetivo backend opcional] [tiempo disponible]"
---

# Ejercicios guiados de NestJS

## Objetivo
Enseñar bases de backend con NestJS de forma clara, progresiva y práctica.

## Modalidad obligatoria
- **sin-ia**: implementar endpoints/manualidad completa guiada.
- **con-ia**: usar IA para scaffolding y refactor, validando manualmente cada endpoint.

## Flujo obligatorio
1. Proponer **mínimo 5 opciones** de ejercicio antes de generar uno.
2. Esperar elección del usuario.
3. Confirmar modalidad (`con-ia` o `sin-ia`) y nivel.
4. Si falta algún dato clave (modalidad, nivel, objetivo backend o ruta destino), **detenerse y preguntar**.
5. Entregar ejercicio guiado del nivel solicitado.
6. Incluir una **solución completa** de API (archivos + endpoints) con explicación de cada parte.

## Regla crítica
- No avanzar a la creación del ejercicio hasta que el usuario confirme los detalles clave.

## Regla anti-solución simple (obligatoria)
- No se aceptan respuestas tipo “aquí tienes el endpoint”.
- Se exige secuencia docente completa: módulo -> controlador -> servicio -> DTO -> pruebas.
- Explicar por bloque: qué hace, por qué se usa y para qué aporta en la API.
- Incluir pruebas manuales de endpoint y resultados esperados.
- Si falta profundidad, rehacer.

## Reglas didácticas
- Explicar en lenguaje simple qué es módulo, controlador, servicio y DTO.
- Incluir pasos verificables para ejecutar y probar endpoints.
- Priorizar REST común y estructura estándar de NestJS.
- Evitar patrones avanzados raros al inicio.
- Mantener enfoque práctico y gradual (ladrillo a ladrillo, estilo Senior Cat).

## Niveles
- **basico**: endpoint GET/POST simple, estructura mínima.
- **medio**: CRUD básico, validaciones simples, DTOs.
- **avanzado**: separación por módulos, pipes/guards básicos, manejo de errores.
- **dios**: mini API estructurada con buenas prácticas, validación robusta y testing básico manual.

## Formato de salida obligatorio
- Opciones iniciales.
- Ejercicio elegido.
- Pasos detallados (setup, archivos, código, pruebas).
- Ejemplos de requests/responses.
- Solución final completa con estructura de módulos/controladores/servicios.
- Explicación por bloque: qué hace, por qué se usa y para qué sirve en la API.
- Guía de validación con pruebas manuales de endpoints.
- Checklist de validación.
- Fallos comunes y corrección.

## Diferencia por modalidad
- Si es `sin-ia`: más detalle en comandos y estructura de archivos.
- Si es `con-ia`: prompts de generación + checklist de pruebas manuales por endpoint.
