// Ejemplos minimos de fetch por metodo HTTP.
// Cambia la URL y el body segun tu API.

const baseUrl = "http://127.0.0.1:3000/items";

// GET (listar)
(async () => {
  try {
    const r = await fetch(baseUrl, { method: "GET" });
    console.log(await r.json());
  } catch (error) {
    console.error(error);
  }
})();

// GET por id
(async () => {
  try {
    const r = await fetch(`${baseUrl}/1`, { method: "GET" });
    console.log(await r.json());
  } catch (error) {
    console.error(error);
  }
})();

// POST (crear)
(async () => {
  try {
    const r = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Nuevo item",
        description: "Creado con fetch",
        active: true,
      }),
    });
    console.log(await r.json());
  } catch (error) {
    console.error(error);
  }
})();

// PUT (reemplazo completo)
(async () => {
  try {
    const r = await fetch(`${baseUrl}/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Item reemplazado",
        description: "PUT completo",
        active: false,
      }),
    });
    console.log(await r.json());
  } catch (error) {
    console.error(error);
  }
})();

// PATCH (actualizacion parcial)
(async () => {
  try {
    const r = await fetch(`${baseUrl}/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: "Cambio parcial con PATCH",
      }),
    });
    console.log(await r.json());
  } catch (error) {
    console.error(error);
  }
})();

// DELETE
(async () => {
  try {
    const r = await fetch(`${baseUrl}/1`, { method: "DELETE" });
    console.log(await r.json());
  } catch (error) {
    console.error(error);
  }
})();

// FORM-DATA (subida de archivo)
const fileInput = document.querySelector("#fileInput");
const formData = new FormData();
formData.append("image", fileInput.files[0]);

(async () => {
  try {
    const r = await fetch(`${baseUrl}/1/upload`, {
      method: "POST",
      body: formData,
    });
    console.log(await r.json());
  } catch (error) {
    console.error(error);
  }
})();
