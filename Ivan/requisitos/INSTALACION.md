# Instalación y configuración del entorno

Este documento recoge los pasos básicos para preparar el entorno de desarrollo recomendado (macOS / Linux). Ajustar las instrucciones para Windows según tu herramienta preferida.

## Requisitos previos
- Terminal (zsh/bash)
- Homebrew (macOS) opcional pero recomendado: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

## nvm (Node Version Manager)
1. Instalar nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
# luego abrir nueva terminal o recargar el shell:
source ~/.zshrc  # o ~/.bashrc según corresponda
```

2. Instalar Node LTS y usarla por defecto:

```bash
nvm install --lts
nvm alias default 'lts/*'
node -v
npm -v
```

3. Actualizar npm (opcional):

```bash
npm install -g npm@latest
```

(Si prefieres `yarn` o `pnpm`):

```bash
npm install -g yarn
# o
npm install -g pnpm
```

## PostgreSQL
(macOS con Homebrew)

```bash
brew install postgresql
brew services start postgresql
# verificar
psql --version
```

Crear usuario / base de datos de ejemplo:

```bash
# crea una BD con el nombre del usuario actual
createdb $(whoami)
# acceder a psql
psql
# dentro de psql (opcional):
# CREATE USER your_user WITH PASSWORD 'your_password';
# CREATE DATABASE your_db OWNER your_user;
```

Notas para Linux: usar el gestor de paquetes de la distribución (apt, dnf) o seguir la guía oficial.

## Variables de entorno y `.env`
- Crear un archivo `.env` en proyectos que lo requieran con variables como:

```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
PORT=3000
NODE_ENV=development
```

- Nunca subir `.env` al repositorio; añadirlo a `.gitignore`.

## Servicios útiles y comprobaciones
- Comprobar versiones:

```bash
node -v
npm -v
psql --version
```

- Iniciar/Parar servicios (Homebrew):

```bash
brew services start postgresql
brew services stop postgresql
```

## Recomendaciones
- Usar `nvm` para aislar versiones de Node en distintos proyectos.
- Mantener `postgresql` como servicio mientras desarrollas.
- Guardar scripts de inicialización (p. ej. `scripts/db-setup.sh`) cuando haya pasos repetibles.

## Recursos
- nvm: https://github.com/nvm-sh/nvm
- Node.js: https://nodejs.org/
- PostgreSQL: https://www.postgresql.org/
- Homebrew: https://brew.sh/
