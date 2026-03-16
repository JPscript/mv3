document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("buscar-receta");
    const enviar = document.getElementById("enviar");
    const divResultado = document.getElementById("resultado");


    // Declaramos la variable recetaId fuera de los eventos para que sea accesible en todo el flujo
    let recetaId = null;

    enviar.addEventListener("click", async function (event) {
        const r = await fetch("http://localhost:3000/recipes");
        const recetasActualizar = await r.json();
        const recetaBuscada = inputBuscar.value;
        const recetasEncontradas = recetasActualizar.filter(function (receta) {
            return receta.nombre.toLowerCase().includes(recetaBuscada.toLowerCase());
        });
        divResultado.innerHTML = "";
        if (!recetasEncontradas.length) {
            divResultado.innerHTML = "No hay recetas disponibles";
            return;
        }
        // Por simplicidad, tomamos la primera receta encontrada
        const receta = recetasEncontradas[0];
        // Asignamos el id de la receta encontrada a la variable global
        recetaId = receta.id;
        // Rellenamos el formulario con los datos de la receta
        form.nombre.value = receta.nombre;
        form.descripcion.value = receta.descripcion;
        form.ingredientes.value = receta.ingredientes;
        form.tiempo_min.value = receta.tiempo_min;
        form.dificultad.value = receta.dificultad;
        // Mostramos los datos también en el divResultado si quieres
        divResultado.innerHTML +=
            "<div class='receta'>" +
            "<h2>" + receta.nombre + "</h2>" +
            "<p><strong>Descripción:</strong> " + receta.descripcion + "</p>" +
            "<p><strong>Ingredientes:</strong> " + receta.ingredientes + "</p>" +
            "<p><strong>Tiempo:</strong> " + receta.tiempo_min + " min</p>" +
            "<p><strong>Dificultad:</strong> " + receta.dificultad + "</p>" +
            "</div>";
    });

    const form = document.getElementById("formulario-update");



    form.addEventListener("submit", function (event) {
    event.preventDefault();

    const recipeActualizar = {
        nombre: form.nombre.value,
        descripcion: form.descripcion.value,
        ingredientes: form.ingredientes.value,
        tiempo_min: parseInt(form.tiempo_min.value),
        dificultad: form.dificultad.value
    };

    (async () => {
        try {
            const r = await fetch(`http://localhost:3000/recipes/${recetaId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recipeActualizar),
            });
            const data = await r.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    })();
});
})