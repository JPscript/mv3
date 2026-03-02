# Instalación de nvm y Node.js 24.14.0 en la carpeta "NodeJs"

Este documento explica cómo instalar NVM en Windows (nvm-windows) y, usando NVM, instalar Node.js v24.14.0 en una carpeta llamada `NodeJs`.

**Requisitos**
- Windows 10/11
- Permisos para instalar software y modificar variables de entorno (preferible cuenta de usuario con permisos de instalación).
- Conexión a Internet.

## 1) Descargar e instalar nvm para Windows (nvm-windows)
1. Abre el navegador y ve a la página de releases de nvm-windows:
   - https://github.com/coreybutler/nvm-windows/releases
2. Descarga el instalador `nvm-setup.exe` de la última release estable.
3. (Opcional) Crea antes la carpeta donde quieres que NVM coloque las versiones. Por ejemplo, en tu perfil de usuario:

```powershell
# Crear carpeta NodeJs en el perfil del usuario
New-Item -ItemType Directory -Path "$env:USERPROFILE\NodeJs"
```

4. Ejecuta `nvm-setup.exe`. Durante la instalación presta atención a las opciones:
   - Cuando el instalador pregunte por **NVM root** o "NVM Home", selecciona la carpeta que has creado (por ejemplo `C:\Users\TuUsuario\NodeJs` o `C:\NodeJs`). Esto hará que las versiones descargadas de Node se guarden allí.
   - Puedes dejar la ruta de "Symlink" (NVM_SYMLINK) por defecto o elegir otra ruta donde quieres que esté el `node.exe` activo (habitualmente `C:\Program Files\nodejs`).

5. Finaliza la instalación y cierra el instalador.

> Nota: descarga siempre el instalador desde el repositorio oficial: `github.com/coreybutler/nvm-windows`.

## 2) Verificar instalación de nvm
Abre una nueva ventana de PowerShell (importante: nueva sesión para cargar las variables de entorno) y ejecuta:

```powershell
nvm --version
```

Si devuelve un número de versión, nvm está instalado correctamente.

## 3) Instalar Node.js 24.14.0 con nvm
1. En la misma ventana de PowerShell, instala la versión solicitada:

```powershell
nvm install 24.14.0
```

2. Activa (usa) esa versión:

```powershell
nvm use 24.14.0
```

3. Comprueba que `node` y `npm` están disponibles y que la versión es la correcta:

```powershell
node -v   # debe mostrar v24.14.0
npm -v
```

Con esto, la versión 24.14.0 quedará instalada en la carpeta `NodeJs` que configuraste como NVM root.

## 4) Si ya instalaste nvm y quieres mover o forzar la carpeta `NodeJs`
Si instalaste nvm sin elegir la carpeta o quieres cambiarla, puedes:

- Crear la carpeta deseada (por ejemplo `C:\NodeJs` o `%USERPROFILE%\NodeJs`).
- Mover manualmente las versiones existentes o reinstalar.
- Ajustar variables de entorno `NVM_HOME` y `NVM_SYMLINK` antes de reiniciar la shell. Ejemplo (PowerShell, para el usuario actual):

```powershell
setx NVM_HOME "%USERPROFILE%\NodeJs"
setx NVM_SYMLINK "%USERPROFILE%\NodeJs\nodejs"
```

Después, cierra y abre PowerShell y ejecuta `nvm root` o `nvm --version` para verificar.

## 5) Solución de problemas comunes
- "nvm" no reconocido: abre una nueva ventana de PowerShell; si sigue igual, revisa que las rutas `NVM_HOME` y `NVM_SYMLINK` estén en la variable `PATH`.
- Permiso denegado al instalar: ejecuta el instalador como administrador o elige una carpeta dentro de tu perfil de usuario.
- Conflicto con instalaciones previas de Node: desinstala versiones de Node instaladas por otros instaladores (ej. desinstalar desde "Agregar o quitar programas") o ajusta `NVM_SYMLINK` a la ruta que quieras usar.

---

Si quieres, puedo:
- Generar comandos exactos para tu ruta preferida (por ejemplo `C:\NodeJs` o `%USERPROFILE%\NodeJs`).
- Instruirte para la instalación en WSL o macOS/Linux (usa `nvm` distinto: https://github.com/nvm-sh/nvm).

