const readBlock = document.getElementById('read');

readBlock.addEventListener('click', async () => {
  try {
    const r = await fetch(baseUrl, { method: "GET" });
    const data = await r.json();
    console.log(data); // Por ahora lo mostramos en consola
    alert(`Se han listado ${data.length} recetas`); // Ejemplo de feedback
  } catch (error) {
    console.error(error);
    alert("Error al listar recetas");
  }
});





