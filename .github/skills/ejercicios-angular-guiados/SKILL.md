---
name: ejercicios-angular-guiados
description: Genera ejercicios guiados de Angular para principiantes absolutos, con opciones creativas previas, nivel configurable y explicación paso a paso.
user-invokable: true
disable-model-invocation: false
argument-hint: "[modalidad: con-ia|sin-ia] [nivel: basico|medio|avanzado|dios] [objetivo app opcional] [tiempo disponible]"
---

# Ejercicios guiados de Angular

## Objetivo
Ayudar a aprender Angular desde cero con ejercicios guiados y progresivos.

## Modalidad obligatoria
- **sin-ia**: construir la app paso a paso sin generación automática.
- **con-ia**: usar IA para acelerar, con revisión técnica manual en cada bloque.

## Flujo obligatorio
1. Ofrecer **mínimo 5 opciones** de ejercicio antes de desarrollar uno.
2. Esperar elección del usuario.
3. Confirmar modalidad (`con-ia` o `sin-ia`) y nivel.
4. Si falta algún dato clave (modalidad, nivel, objetivo de app o ruta destino), **detenerse y preguntar**.
5. Generar ejercicio guiado en detalle.
6. Incluir una **solución completa** con archivos finales y explicación por bloques.

## Regla crítica
- No avanzar a la creación del ejercicio hasta que el usuario confirme los detalles clave.

## Regla anti-solución simple (obligatoria)
- Prohibido entregar solo comandos o fragmentos aislados.
- Debe existir guía docente por fases (setup, componentes, servicios, rutas, prueba).
- En cada fase explicar: qué se crea, por qué y para qué sirve en la app.
- Incluir validación funcional fase a fase.
- Si la solución es superficial, rehacer.

## Reglas didácticas
- Explicar conceptos base (componente, template, binding, servicios, rutas) en términos simples.
- Aterrizar cada paso: qué se crea, por qué y cómo probarlo.
- Evitar complejidad innecesaria en niveles bajos.
- Priorizar patrones comunes de Angular actuales.
- Evitar features raras/poco usadas sin pedido explícito.

## Niveles
- **basico**: componentes simples, interpolación, eventos, ngIf/ngFor.
- **medio**: inputs/outputs, servicios básicos, formularios sencillos.
- **avanzado**: rutas, consumo de API, estado simple.
- **dios**: mini app modular con flujo completo y buenas prácticas esenciales.

## Formato de salida obligatorio
- Opciones iniciales creativas.
- Ejercicio elegido con contexto.
- Pasos detallados (comandos + archivos + explicación).
- Fragmentos de código comentados.
- Solución final completa (estructura y archivos clave).
- Explicación de cada archivo/bloque: qué hace, por qué se crea así y para qué sirve.
- Guía de ejecución y validación funcional.
- Checklist funcional.
- Errores típicos y solución.
- Próximo reto para seguir construyendo.

## Diferencia por modalidad
- Si es `sin-ia`: priorizar pasos manuales y comprensión de cada archivo/comando.
- Si es `con-ia`: incluir prompts por fase (componente/servicio/rutas) y checklist de validación manual.
