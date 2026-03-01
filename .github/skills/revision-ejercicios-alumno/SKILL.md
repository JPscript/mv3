---
name: revision-ejercicios-alumno
description: Revisa ejercicios del alumnado, devuelve feedback técnico breve, sugerencias de mejora y cierre motivador con tono positivo.
user-invokable: true
disable-model-invocation: false
argument-hint: "[ruta o archivo] [tema] [nivel esperado]"
---

# Revisión de ejercicios del alumnado

## Objetivo
Dar retroalimentación útil y motivadora sobre ejercicios de frontend, sin bloquear el progreso.

## Cuándo usar
- Después de cada práctica.
- Antes de cerrar una clase o revisar entregables.

## Procedimiento
1. Revisar el ejercicio en contexto del tema de la clase.
2. Entregar feedback en 3 bloques:
   - **Lo que está bien** (fortalezas concretas),
   - **Qué mejorar** (2-4 puntos accionables),
   - **Siguiente paso** (una tarea breve y clara).
3. Ajustar feedback según carpeta:
   - `sin-ia`: priorizar fundamentos y claridad.
   - `con-ia`: revisar que se entienden los conceptos, que se soluciona el ejercicio propuesto y además revisar calidad de prompts e iteraciones si lo incluye el alumno en la solución del ejercicio.
4. Cerrar con mensaje motivador breve y cercano.

## Estilo de feedback
- Específico, respetuoso y accionable.
- Evitar tono punitivo o ambiguo.
- Incluir comentarios cortos tipo docente.

## Salida esperada
- Informe breve de revisión.
- Sugerencias concretas para mejorar en la siguiente iteración.
- Cierre motivador (puede incluir frase divertida breve).
