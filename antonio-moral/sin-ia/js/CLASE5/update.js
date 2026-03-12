const baseUrl = "http://127.0.0.1:3000/recipes";

async function leerRecetas() {
    var r = await fetch(baseUrl);
    var data = await r.json();
    console.log(data);
}

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