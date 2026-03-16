# CLASE7

## Tema y objetivo del día

- **Tema:** Preparación de entorno backend con PostgreSQL, arranque de API en NestJS y validación de endpoints con Postman.
- **Fecha:** Lunes 9 de marzo de 2026.
- **Horario:** 16:30 - 20:30.
- **Objetivo:** Configurar el entorno completo de backend para el proyecto api-recetas, preparando la base de datos, ejecutando la API en local y validando su funcionamiento mediante pruebas con Postman.


## Resultados de aprendizaje de la sesión

- Preparación de base de datos con PostgreSQL: Comprendimos cómo ejecutar scripts SQL desde terminal para crear la base de datos, generar el esquema de tablas y cargar datos iniciales necesarios para que la API funcione correctamente.

- Flujo de trabajo backend por capas: Aprendimos que el backend se construye de forma progresiva comenzando por la base de datos, continuando con la capa de aplicación (API) y finalizando con pruebas desde un cliente HTTP.

- Configuración y ejecución de un proyecto NestJS: Practicamos el proceso real de desarrollo tras obtener un repositorio: actualizar el código con git pull, instalar dependencias con npm install y arrancar el servidor en modo desarrollo.

## Conocimientos adquiridos en con los ejercicios de la sesión

Durante esta sesión trabajamos en la preparación completa del entorno backend del proyecto api-recetas. El objetivo fue comprender cómo se estructura un flujo de trabajo real de desarrollo backend, desde la capa de datos hasta la validación de los endpoints de una API.

La sesión comenzó con la configuración de la base de datos utilizando PostgreSQL. Ejecutamos diferentes scripts SQL desde la terminal para crear la base de datos, definir el esquema de tablas y cargar datos iniciales que permitieran a la API operar correctamente. Este proceso permitió entender cómo los sistemas backend dependen de una estructura de datos correctamente preparada antes de iniciar la aplicación.

Posteriormente se trabajó con el proyecto backend desarrollado con NestJS. Se actualizó el repositorio mediante git pull y se instalaron las dependencias necesarias utilizando npm install. Después de revisar el archivo .env para asegurar que la conexión a la base de datos estuviera correctamente configurada, se ejecutó el servidor en modo desarrollo con npm run start:dev, lo que permitió levantar la API en local.

Una vez que la API estaba funcionando, se pasó a validar su comportamiento utilizando Postman. Se creó un nuevo workspace y se importó la colección de peticiones incluida dentro del proyecto. Esto permitió probar distintos endpoints de la API, verificar que las respuestas se recibieran correctamente y analizar los códigos de estado HTTP devueltos por el servidor.

Durante la práctica surgieron algunos errores comunes relacionados con la conexión a la base de datos, la ejecución incorrecta de scripts SQL o dependencias faltantes en el proyecto. Resolver estos problemas permitió reforzar la comprensión del flujo completo de un backend y entender cómo diagnosticar fallos utilizando los logs del servidor y las respuestas de las peticiones HTTP.

Finalmente se realizó una ronda de correcciones para asegurar que todos los entornos estuvieran funcionando correctamente y que las pruebas de los endpoints principales respondieran de forma adecuada.

## Actividades sin-ia

- Acceder al proyecto api-recetas desde la terminal.
- Revisar los scripts de base de datos dentro de la carpeta scripts.
- Ejecutar manualmente los scripts SQL en el orden correcto.
- Verificar que las tablas de la base de datos se hayan creado correctamente.
- Actualizar el repositorio del proyecto con git pull
- Instalar dependencias del proyecto usando npm install.
- Revisar el archivo .env y comprobar la configuración de conexión a PostgreSQL.
- Ejecutar el servidor de NestJS en modo desarrollo.
- Probar manualmente los endpoints de la API utilizando Postman.

## Actividades con-ia

- No se aplicó IA en esta sesión.

# Predicción próxima clase

- Conectar el backend desarrollado con un frontend en HTML, CSS y JavaScript.
- Consumir los endpoints de la API desde el navegador.
- Implementar operaciones CRUD visibles para el usuario final.
- Comprender cómo el frontend y el backend se comunican mediante peticiones HTTP.

## Entregables mínimos del día

- Base de datos PostgreSQL creada y scripts ejecutados correctamente.
- Proyecto api-recetas funcionando en local.
- API levantada con NestJS sin errores críticos.
- Workspace de Postman creado con la colección del proyecto importada.
- Registro breve de dudas en `DUDAS.md`.
- Nota corta en la bitácora personal sobre lo aprendido y las dificultades encontradas.

## Autoevaluación y próximos pasos

- [x] Entiendo por qué la base de datos debe prepararse antes de levantar la API.
- [x] Puedo ejecutar scripts SQL desde la terminal.
- [x] Comprendo el flujo básico de arranque de un proyecto NestJS.
- [x] Puedo verificar el funcionamiento de endpoints usando Postman.
- [ ] Escribí cómo me sentí durante la clase.
- [ ] Registré mis dudas en `DUDAS.md`.
- [x] Escribí mi predicción para la siguiente clase.