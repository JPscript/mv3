// Crear un html con una etiquete donde meter todas las tarjetas.
// Con JS, llamar a la API para obtener las recetas y mostrarlas en la página como tarjetas.
// Cada tarjeta al hacerle click, mostrará un modal con la información de la receta en un formulario y un botón para editarla.
// Al hacer click con javascript comparamos los datos del id de la receta con los datos del formulario, y las claves diferentes las guardamos en un objeto nuevo.
// Si hay alguna diferencia hacemos un fetch (PATCH) a la API para actualizar la receta, si no hay ninguna diferencia, no hacemos nada.
/*
 El objeto pintado:
{
"id": 1,
"nombre": "Tostada Senior Cat",
"descripcion": "Tostada crujiente con aguacate y limón",
"ingredientes": "pan,aguacate,limon,sal",
"tiempo_min": 10,
"dificultad": "facil",
"image_url": null,

}
Los datos del formulario:
{
"id": 1,
"nombre": "Tostada Senior Cat Suprema",
"descripcion": "Tostada crujiente con aguacate y limón",
"ingredientes": "pan,aguacate,limon,sal",
"tiempo_min": 10,
"dificultad": "facil",
"image_url": null,
}
*/
async function leerRecetas() {
    var recetas = await fetch("http://localhost:3000/recipes")
}

function data() {
    document.getElementById("create-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        // Comparacion de datos
        let cambios = {};
        if (formData.get("nombre") !== receta.nombre) {
            cambios.nombre = formData.get("nombre");
        }        
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
            const fileResponse = await fetch("http://localhost:3000/recipes/"+body.id+"/image", {
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