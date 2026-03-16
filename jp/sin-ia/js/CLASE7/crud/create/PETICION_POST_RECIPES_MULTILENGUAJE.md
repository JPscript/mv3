# Peticion POST /recipes en varios lenguajes

Este documento replica la misma peticion HTTP que haces en JavaScript:
- URL: http://localhost:3000/recipes
- Metodo: POST
- Header: Content-Type: application/json
- Body JSON:
  - nombre
  - descripcion
  - ingredientes
  - tiempo_min
  - dificultad

## 1) JavaScript (referencia)

```javascript
const response = await fetch("http://localhost:3000/recipes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nombre: formData.get("nombre"),
    descripcion: formData.get("descripcion"),
    ingredientes: formData.get("ingredientes"),
    tiempo_min: Number(formData.get("tiempo")),
    dificultad: formData.get("dificultad")
  }),
});

const body = await response.json();
console.log(body);
```

## 2) Python (requests)

```python
import requests

url = "http://localhost:3000/recipes"

payload = {
    "nombre": "Tortilla",
    "descripcion": "Receta clasica",
    "ingredientes": "huevos, patatas, cebolla",
    "tiempo_min": 25,
    "dificultad": "media"
}

headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
print(response.status_code)
print(response.json())
```

## 3) Python (httpx)

```python
import httpx

url = "http://localhost:3000/recipes"

payload = {
    "nombre": "Tortilla",
    "descripcion": "Receta clasica",
    "ingredientes": "huevos, patatas, cebolla",
    "tiempo_min": 25,
    "dificultad": "media"
}

with httpx.Client() as client:
    response = client.post(url, json=payload)
    print(response.status_code)
    print(response.json())
```

## 4) Java (HttpClient de Java 11+)

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class PostRecipe {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();

        String json = """
            {
              "nombre": "Tortilla",
              "descripcion": "Receta clasica",
              "ingredientes": "huevos, patatas, cebolla",
              "tiempo_min": 25,
              "dificultad": "media"
            }
            """;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://localhost:3000/recipes"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.statusCode());
        System.out.println(response.body());
    }
}
```

## 5) Rust (reqwest + tokio + serde_json)

```rust
use reqwest::Client;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();

    let payload = json!({
        "nombre": "Tortilla",
        "descripcion": "Receta clasica",
        "ingredientes": "huevos, patatas, cebolla",
        "tiempo_min": 25,
        "dificultad": "media"
    });

    let response = client
        .post("http://localhost:3000/recipes")
        .header("Content-Type", "application/json")
        .json(&payload)
        .send()
        .await?;

    println!("{}", response.status());
    let body = response.text().await?;
    println!("{}", body);

    Ok(())
}
```

Dependencias en Cargo.toml:

```toml
[dependencies]
reqwest = { version = "0.12", features = ["json"] }
tokio = { version = "1", features = ["full"] }
serde_json = "1"
```

## 6) C++ (libcurl)

```cpp
#include <curl/curl.h>
#include <iostream>
#include <string>

int main() {
    CURL* curl = curl_easy_init();
    if (!curl) {
        std::cerr << "No se pudo iniciar CURL" << std::endl;
        return 1;
    }

    std::string json = R"({
        "nombre": "Tortilla",
        "descripcion": "Receta clasica",
        "ingredientes": "huevos, patatas, cebolla",
        "tiempo_min": 25,
        "dificultad": "media"
    })";

    struct curl_slist* headers = nullptr;
    headers = curl_slist_append(headers, "Content-Type: application/json");

    curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:3000/recipes");
    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
    curl_easy_setopt(curl, CURLOPT_POST, 1L);
    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json.c_str());

    CURLcode res = curl_easy_perform(curl);
    if (res != CURLE_OK) {
        std::cerr << "Error: " << curl_easy_strerror(res) << std::endl;
    }

    curl_slist_free_all(headers);
    curl_easy_cleanup(curl);
    return 0;
}
```

## 7) C# (.NET HttpClient)

```csharp
using System.Net.Http;
using System.Text;
using System.Text.Json;

var httpClient = new HttpClient();

var payload = new
{
    nombre = "Tortilla",
    descripcion = "Receta clasica",
    ingredientes = "huevos, patatas, cebolla",
    tiempo_min = 25,
    dificultad = "media"
};

var json = JsonSerializer.Serialize(payload);
var content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await httpClient.PostAsync("http://localhost:3000/recipes", content);
var body = await response.Content.ReadAsStringAsync();

Console.WriteLine((int)response.StatusCode);
Console.WriteLine(body);
```

## 8) PHP (cURL)

```php
<?php
$url = "http://localhost:3000/recipes";

$payload = [
    "nombre" => "Tortilla",
    "descripcion" => "Receta clasica",
    "ingredientes" => "huevos, patatas, cebolla",
    "tiempo_min" => 25,
    "dificultad" => "media"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

echo $status . PHP_EOL;
echo $response . PHP_EOL;
```

## 9) Go (net/http)

```go
package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

type Recipe struct {
    Nombre       string `json:"nombre"`
    Descripcion  string `json:"descripcion"`
    Ingredientes string `json:"ingredientes"`
    TiempoMin    int    `json:"tiempo_min"`
    Dificultad   string `json:"dificultad"`
}

func main() {
    payload := Recipe{
        Nombre:       "Tortilla",
        Descripcion:  "Receta clasica",
        Ingredientes: "huevos, patatas, cebolla",
        TiempoMin:    25,
        Dificultad:   "media",
    }

    data, _ := json.Marshal(payload)

    req, _ := http.NewRequest("POST", "http://localhost:3000/recipes", bytes.NewBuffer(data))
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Println(resp.StatusCode)
    fmt.Println(string(body))
}
```

## 10) cURL (linea de comandos)

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

---

Nota:
- Todos estos ejemplos hacen la misma operacion de alto nivel que tu fetch.
- Si quieres HTTPS, cambias la URL a https://... y gestionas certificado en el servidor.
