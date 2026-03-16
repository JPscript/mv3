function data() {
  document.getElementById("create-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    console.log("nombre: ", formData.get("nombre"))
    console.log("descripcion: ", formData.get("descripcion"))
    console.log("ingredientes: ", formData.get("ingredientes"))
    console.log("tiempo min: ", formData.get("tiempo"))
    console.log("dificultad: ", formData.get("dificultad"))
    console.log("imagen: ", formData.get("image"))
    try {
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
      console.log("body: ", body)
      const fileResponse = await fetch("http://localhost:3000/recipes/" + body.id + "/image", {
        method: "POST",
        body: formData,
      });
      const fileBody = await fileResponse.json();
      console.log("fileBody: ", fileBody);
    }
    catch (error) {
      console.error("Error: ", error);
    }
  })
}
data();