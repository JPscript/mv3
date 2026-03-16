const api_url = "http://localhost:3000/recipes";

function crearReceta() {
    const formulario = document.getElementById('Formulario-Receta');
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        console.log("nombre: ", formData.get("nombre"))
        console.log("descripcion: ", formData.get("descripcion"))
        console.log("ingredientes: ", formData.get("ingredientes"))
        console.log("tiempo min: ", formData.get("tiempo"))
        console.log("dificultad: ", formData.get("dificultad"))
        console.log("imagen: ", formData.get("file"))
        try {
            const response = await fetch(`${api_url}`, {
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
            if (!response.ok) throw new Error("Error en la creación");
            alert("Receta creada correctamente");
        }
        catch (error) {
            console.error("Error: ", error);
        }
    })
}
crearReceta();