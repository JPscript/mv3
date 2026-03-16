---
name: ejercicios-postgres-guiados
description: Genera ejercicios guiados de PostgreSQL para principiantes absolutos, con opciones creativas previas, nivel configurable y explicación paso a paso.
user-invokable: true
disable-model-invocation: false
argument-hint: "[modalidad: con-ia|sin-ia] [nivel: basico|medio|avanzado|dios] [dominio opcional] [tiempo disponible]"
---

# Ejercicios guiados de PostgreSQL

## Objetivo
Aprender PostgreSQL desde cero con ejercicios guiados, útiles y orientados a casos reales.

## Modalidad obligatoria
- **sin-ia**: escribir y entender SQL manualmente paso a paso.
- **con-ia**: usar IA para proponer consultas/modelo y validar manualmente resultados.

## Flujo obligatorio
1. Proponer **mínimo 5 opciones** de ejercicio antes de crear uno.
2. Esperar selección del usuario.
3. Confirmar modalidad (`con-ia` o `sin-ia`) y nivel.
4. Si falta algún dato clave (modalidad, nivel, dominio/objetivo o ruta destino), **detenerse y preguntar**.
5. Generar ejercicio guiado paso a paso.
6. Incluir una **solución completa** con SQL final y explicación de cada consulta/decisión.

## Regla crítica
- No avanzar a la creación del ejercicio hasta que el usuario confirme los detalles clave.

## Regla anti-solución simple (obligatoria)
- Prohibido entregar solo SQL sin explicar.
- Exigir paso a paso docente: creación, inserción, consulta, validación.
- Cada sentencia debe explicar: qué hace, por qué se usa y para qué sirve.
- Incluir verificación de resultados por cada bloque.
- Si está superficial, rehacer la entrega.

## Reglas didácticas
- Explicar conceptos clave: tabla, fila, columna, clave primaria, relación.
- Incluir comandos SQL claros y ordenados.
- Mostrar cómo verificar resultados de cada paso.
- Priorizar SQL común de uso profesional (SELECT, INSERT, UPDATE, DELETE, JOIN, filtros).
- Evitar funciones muy raras o avanzadas sin pedido explícito.

## Niveles
- **basico**: crear BD/tablas, insertar y consultar datos simples.
- **medio**: joins básicos, filtros, orden, agregaciones simples.
- **avanzado**: relaciones más completas, constraints, vistas y consultas más elaboradas.
- **dios**: mini caso real con modelo relacional robusto, consultas complejas y validación de integridad.

## Formato de salida obligatorio
- Opciones iniciales creativas.
- Ejercicio elegido.
- Guía paso a paso con SQL comentado.
- Resultado esperado por bloque.
- Solución final completa (script SQL ordenado para ejecutar de inicio a fin).
- Explicación por sentencia: qué hace, por qué se usa y para qué sirve.
- Guía de verificación de resultados.
- Checklist de validación.
- Errores comunes y solución.
- Siguiente desafío opcional.

## Diferencia por modalidad
- Si es `sin-ia`: priorizar escritura manual de SQL y explicación de resultados.
- Si es `con-ia`: incluir prompts para modelo/consultas y verificación manual de consistencia.
