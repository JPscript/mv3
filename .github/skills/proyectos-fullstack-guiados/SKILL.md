---
name: proyectos-fullstack-guiados
description: Genera proyectos guiados usando HTML, CSS, JavaScript, Angular, NestJS y PostgreSQL, con opciones creativas previas, nivel configurable y modalidad con-ia/sin-ia.
user-invokable: true
disable-model-invocation: false
argument-hint: "[modalidad: con-ia|sin-ia] [nivel: basico|medio|avanzado|dios] [dominio opcional] [tiempo disponible] [ruta destino opcional]"
---

# Proyectos fullstack guiados (HTML + CSS + JS + Angular + NestJS + PostgreSQL)

## Objetivo
Proponer y guiar proyectos completos que integren todas las tecnologías del curso, con explicación clara y progresiva para principiantes.

## Flujo obligatorio
1. Ofrecer **mínimo 5 opciones** de proyecto (creativas, útiles y divertidas).
2. Esperar que el usuario elija 1 proyecto.
3. Confirmar modalidad (`con-ia` o `sin-ia`) y nivel (`basico|medio|avanzado|dios`).
4. Confirmar ruta destino exacta para generar el proyecto.
5. Si falta algún dato clave (modalidad, nivel, proyecto elegido o ruta destino), **detenerse y preguntar**.
6. Diseñar el proyecto elegido paso a paso, cubriendo todas las tecnologías.
7. Entregar una **solución completa** por fases con explicación detallada de cada capa.
8. Proponer estructura de carpetas destino según la modalidad y tecnología.

## Regla crítica
- No avanzar a la creación del proyecto hasta que el usuario confirme los detalles clave.

## Regla anti-solución simple (obligatoria)
- Nunca entregar un “resumen de arquitectura” sin ejecución guiada.
- Debe existir recorrido docente completo por capas: HTML/CSS/JS/Angular/NestJS/PostgreSQL.
- Cada fase debe explicar: qué se implementa, por qué y para qué aporta al producto final.
- Debe incluir validación por capa y validación integral end-to-end.
- Si la solución es superficial o incompleta, rehacer antes de entregar.

## Modalidad obligatoria
- **sin-ia**: construir manualmente siguiendo instrucciones detalladas y razonadas.
- **con-ia**: construir con IA (prompts + iteraciones), validando manualmente cada bloque.

## Regla de cobertura tecnológica
El proyecto debe incluir explícitamente:
- HTML (estructura semántica de vistas).
- CSS (estilo y layout común de uso real).
- JavaScript (lógica de interfaz o validaciones).
- Angular (frontend estructurado por componentes/servicios/rutas según nivel).
- NestJS (API backend para el frontend).
- PostgreSQL (modelo de datos y consultas clave).

## Reglas didácticas
- No asumir conocimientos previos.
- Explicar cada tecnología en términos simples: qué es, para qué sirve y cómo conecta con las demás.
- Evitar herramientas/funciones raras poco usadas en el mundo real.
- Priorizar patrones comunes y mantenibles.
- Mantener tono motivador y progresivo (ladrillo a ladrillo, con Senior Cat como referencia del curso).

## Niveles
- **basico**: versión mínima funcional de extremo a extremo.
- **medio**: más funcionalidades, validaciones básicas y mejores flujos.
- **avanzado**: arquitectura más clara por capas, manejo de errores y mejoras de calidad.
- **dios**: proyecto robusto con alcance mayor, criterios estrictos de calidad y plan de iteraciones.

## Formato de salida obligatorio
- Opciones iniciales de proyecto (3-5).
- Proyecto elegido + objetivo de negocio.
- Mapa de arquitectura simple (frontend/backend/bd).
- Plan por fases y pasos guiados muy detallados.
- Entregables por tecnología.
- Solución final completa por tecnología (HTML, CSS, JS, Angular, NestJS, PostgreSQL).
- Explicación por fase y por bloque: qué se hace, por qué se hace así y para qué sirve.
- Guía de verificación integral (frontend + backend + base de datos).
- Checklist de validación por capa.
- Errores frecuentes y cómo solucionarlos.
- Próximos pasos para evolucionar el proyecto.

## Diferencia por modalidad
- Si es `sin-ia`: foco en implementación manual y comprensión de cada decisión.
- Si es `con-ia`: incluir prompts por fase (HTML/CSS/JS/Angular/NestJS/Postgres), iteraciones sugeridas y verificación manual obligatoria.

## Nota de implementación
Cuando el usuario elija el proyecto final, generarlo en la carpeta indicada por él dentro de su ruta personal (`con-ia` o `sin-ia`) y documentar los pasos para continuar.
