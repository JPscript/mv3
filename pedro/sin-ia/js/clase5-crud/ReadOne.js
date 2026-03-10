const baseUrl = "http://127.0.0.1:3000/items";


// GET por id
(async () => {
  try {
    const r = await fetch(`${baseUrl}/1`, { method: "GET" });
    console.log(await r.json());
  } catch (error) {
    console.error(error);
  }
})();