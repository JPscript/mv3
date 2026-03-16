---
name: ejercicios-css-guiados
description: Genera ejercicios guiados de CSS para principiantes absolutos, con opciones creativas previas, nivel configurable y explicación paso a paso.
user-invokable: true
disable-model-invocation: false
argument-hint: "[modalidad: con-ia|sin-ia] [nivel: basico|medio|avanzado|dios] [objetivo visual opcional] [tiempo disponible]"
---

# Ejercicios guiados de CSS

## Objetivo
Crear ejercicios de CSS prácticos para aprender estilo, layout y responsive sin abrumar.

## Modalidad obligatoria
- **sin-ia**: el alumno escribe CSS manualmente siguiendo guía detallada.
- **con-ia**: el alumno usa IA para acelerar, pero debe revisar y corregir manualmente.

## Flujo obligatorio
1. Proponer primero **mínimo 5 opciones** de ejercicio (divertidas y útiles).
2. Esperar que el usuario elija.
3. Confirmar modalidad (`con-ia` o `sin-ia`) y nivel.
4. Si falta algún dato clave (modalidad, nivel, objetivo visual o ruta destino), **detenerse y preguntar**.
5. Crear el ejercicio guiado elegido.
6. Incluir una **solución completa** paso a paso con explicación del porqué y para qué de cada decisión de estilo.

## Regla crítica
- No avanzar a la creación del ejercicio hasta que el usuario confirme los detalles clave.

## Regla anti-solución simple (obligatoria)
- Nunca dar una solución “solo código”.
- Explicar paso a paso cada decisión visual/técnica.
- Incluir por bloque: qué regla aplica, por qué se usa y para qué mejora la UI.
- Añadir validación responsive y checklist final.
- Si la salida es superficial, rehacerla.

## Reglas didácticas
- Explicar qué hace cada propiedad y por qué se usa.
- Mostrar progreso por capas: base -> mejora visual -> layout.
- Usar CSS moderno y común (selectores, box model, tipografía, colores, flex/grid básico).
- Evitar técnicas raras o hacks innecesarios.
- No usar frameworks a menos que se pidan.
- Mantener referencias motivadoras de Senior Cat y la idea de construir por ladrillos.

## Niveles
- **basico**: selectores simples, color, tipografía, margin/padding.
- **medio**: clases reutilizables, estados hover/focus, organización por bloques.
- **avanzado**: flexbox/grid aplicado, jerarquía visual sólida, responsive básico.
- **dios**: reto de diseño completo con criterios de consistencia, accesibilidad visual y escalabilidad.

## Formato de salida obligatorio
- Opciones iniciales.
- Ejercicio elegido.
- Objetivo + resultado esperado.
- Pasos guiados con ejemplos comentados.
- Solución final completa (`index.html` + `styles.css` cuando aplique).
- Explicación por secciones: qué hace cada regla, por qué se usa y qué efecto visual produce.
- Guía de verificación visual y responsive.
- Checklist de validación visual/técnica.
- Errores frecuentes.
- Mejora opcional para siguiente nivel.

## Diferencia por modalidad
- Si es `sin-ia`: detallar propiedades y decisiones de estilo paso a paso.
- Si es `con-ia`: incluir prompts de generación/refactor y checklist de revisión manual.
