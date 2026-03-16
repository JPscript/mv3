# Peticion POST /recipes en Shell (Rai)

Objetivo: replicar la misma peticion que en fetch de JavaScript, pero desde terminal.

- URL: http://localhost:3000/recipes
- Metodo: POST
- Header: Content-Type: application/json
- Body JSON:
  - nombre
  - descripcion
  - ingredientes
  - tiempo_min
  - dificultad

## 1) Bash/Zsh/Git Bash (cURL)

```bash
curl -X POST "http://localhost:3000/recipes" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tortilla",
    "descripcion": "Receta clasica",
    "ingredientes": "huevos, patatas, cebolla",
    "tiempo_min": 25,
    "dificultad": "media"
  }'
```

## 2) Guardar en archivo .sh

Crea un archivo llamado `post_recipe.sh`:

```bash
#!/usr/bin/env bash

curl -s -X POST "http://localhost:3000/recipes" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tortilla",
    "descripcion": "Receta clasica",
    "ingredientes": "huevos, patatas, cebolla",
    "tiempo_min": 25,
    "dificultad": "media"
  }'
```

Dar permisos y ejecutar:

```bash
chmod +x post_recipe.sh
./post_recipe.sh
```

## 3) PowerShell (Invoke-RestMethod)

```powershell
$body = @{
  nombre = "Tortilla"
  descripcion = "Receta clasica"
  ingredientes = "huevos, patatas, cebolla"
  tiempo_min = 25
  dificultad = "media"
} | ConvertTo-Json

Invoke-RestMethod -Method Post \
  -Uri "http://localhost:3000/recipes" \
  -ContentType "application/json" \
  -Body $body
```

## 4) Ver codigo de estado y respuesta con cURL

```bash
curl -i -X POST "http://localhost:3000/recipes" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tortilla",
    "descripcion": "Receta clasica",
    "ingredientes": "huevos, patatas, cebolla",
    "tiempo_min": 25,
    "dificultad": "media"
  }'
```

## 5) Version parametrizable (variables en Bash)

```bash
NOMBRE="Tortilla"
DESCRIPCION="Receta clasica"
INGREDIENTES="huevos, patatas, cebolla"
TIEMPO=25
DIFICULTAD="media"

curl -X POST "http://localhost:3000/recipes" \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"$NOMBRE\",\"descripcion\":\"$DESCRIPCION\",\"ingredientes\":\"$INGREDIENTES\",\"tiempo_min\":$TIEMPO,\"dificultad\":\"$DIFICULTAD\"}"
```

---

Nota de aprendizaje:
- Es la misma logica de tu fetch: mismo endpoint, mismo metodo, mismo header y mismo JSON.
- Solo cambia la herramienta cliente (terminal en lugar de navegador).
