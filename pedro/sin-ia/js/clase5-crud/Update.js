const baseUrl = "http://127.0.0.1:3000/items";


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