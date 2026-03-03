# Requisitos e instalación del entorno

Este documento describe cómo instalar y configurar las herramientas necesarias para trabajar con los proyectos del módulo: **nvm**, **Node.js**, **PostgreSQL** y otras utilidades comunes.

## 1. Node Version Manager (nvm)

Se recomienda usar `nvm` para gestionar versiones de Node.js en el sistema.

### Instalación

1. Abrir una terminal (PowerShell en Windows).
2. Descargar e instalar `nvm` para Windows desde el [repositorio oficial](https://github.com/coreybutler/nvm-windows/releases) (archivo `nvm-setup.zip` o `.exe`).
3. Ejecutar el instalador y seguir las instrucciones.
4. Cerrar y volver a abrir la terminal para que `nvm` esté disponible.

### Uso básico

```powershell
# listar versiones disponibles
nvm list available

# instalar una versión concreta (ej. 18.20.0)
nvm install 18.20.0

# usar una versión instalada
nvm use 18.20.0

# verificar
node -v
npm -v
```

## 2. Node.js y npm

Una vez nvm configurado, instalar la versión requerida:

```powershell
nvm install 18.20.0   # o la versión que indique el proyecto
nvm use 18.20.0
```

Comprueba que `node` y `npm` funcionan correctamente.

## 3. PostgreSQL

El proyecto usa PostgreSQL como base de datos. A continuación se detallan los pasos de instalación y configuración básicos.

### Instalación

1. Descargar el instalador de PostgreSQL desde el sitio oficial: https://www.postgresql.org/download/
2. Ejecutar el instalador y seguir los pasos, eligiendo:
   - Puerto por defecto: `5432`
   - Usuario administrador (`postgres`) y contraseña segura.
3. Marcar la casilla para instalar también `pgAdmin` si se desea una interfaz gráfica.





## 4. Verificación final

Después de completar los pasos anteriores, verifica el entorno con:

```powershell
node -v && npm -v
psql --version
```

Y prueba levantar el proyecto siguiendo sus instrucciones específicas.


## 5. Herramientas adicionales (opcionales)

Además de los requisitos anteriores, es conveniente contar con algunas herramientas que facilitan el desarrollo:

- **Git**: control de versiones. Instálalo desde https://git-scm.com/.
- **Editor / IDE**: Visual Studio Code es ampliamente usado; descarga en https://code.visualstudio.com/.
- **Extensiones útiles**: ESLint, Prettier, Docker (si se usa), etc.
- **Docker**: para contenerizar servicios o bases de datos si el proyecto lo requiere.

> Estas herramientas no son estrictamente necesarias para ejecutar los ejercicios, pero mejoran la experiencia de desarrollo.

---

Con esto tendrás un entorno listo para desarrollar y ejecutar los ejercicios del módulo.