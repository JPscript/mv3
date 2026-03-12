const baseUrl = "http://127.0.0.1:3000/recipes";

document.getElementById("crearReceta").addEventListener("submit", crearReceta);

async function crearReceta(event) {
  event.preventDefault();

  // datos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const ingredientes = document.getElementById("ingredientes").value.trim();
  const dificultad = document.getElementById("dificultad").value.trim().toLowerCase();
  const tiempo_min = Number(document.getElementById("tiempo").value);
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  const bodyData = { nombre, descripcion, ingredientes, dificultad, tiempo_min };

  try {
    // 8Crear receta (JSON)
    const r = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const data = await r.json();

    if (!r.ok) {
      console.error("Error creando receta:", data);
      alert("Error al crear receta ❌. Revisa la consola.");
      return;
    }

    alert("Receta creada correctamente ✅");

    // Subir imagen si hay archivo
    if (file) {
      const formData = new FormData();
      formData.append("image", file); 

      const uploadUrl = `${baseUrl}/${data.id}/image`;

      const r2 = await fetch(uploadUrl, {
        method: "POST",
        body: formData, 
      });

      const imgData = await r2.json();

      if (!r2.ok) {
        console.error("Error subiendo imagen:", imgData);
        alert("Receta creada, pero fallo al subir la imagen ❌");
      } else {
        alert("Imagen subida correctamente ✅");
      }
    }


    document.getElementById("crearReceta").reset();

  } catch (error) {
    console.error("Error del servidor:", error);
  }
}