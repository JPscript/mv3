// Esperamos a que toda la página (DOM) esté cargada antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos el input donde el usuario escribe el nombre de la receta a buscar.
    const inputBuscar = document.getElementById("buscar-receta");
    // Obtenemos el botón para enviar la búsqueda.
    const enviar = document.getElementById("enviar");
    // Obtenemos el div donde mostraremos el resultado de la búsqueda.
    const divResultado = document.getElementById("resultado");

    // Declaramos una variable para guardar el id de la receta encontrada.
    // Usamos 'let' porque su valor puede cambiar.
    let recetaId = null;

    // Cuando el usuario hace clic en el botón "enviar", ejecutamos esta función.
    enviar.addEventListener("click", async function (event) {
        // Pedimos (fetch) todas las recetas al servidor local (API).
        const r = await fetch("http://localhost:3000/recipes");
        // Convertimos la respuesta en un array de objetos (recetas).
        const recetasActualizar = await r.json();
        // Guardamos el texto que el usuario escribió para buscar.
        const recetaBuscada = inputBuscar.value;
        // Filtramos las recetas para encontrar las que coincidan con el nombre buscado (ignorando mayúsculas/minúsculas).
        const recetasEncontradas = recetasActualizar.filter(function (receta) {
            return receta.nombre.toLowerCase().includes(recetaBuscada.toLowerCase());
        });
        // Limpiamos el div de resultados antes de mostrar algo nuevo.
        divResultado.innerHTML = "";
        // Si no encontramos ninguna receta, mostramos un mensaje y salimos de la función.
        if (!recetasEncontradas.length) {
            divResultado.innerHTML = "No hay recetas disponibles";
            return;
        }
        // Por simplicidad, usamos la primera receta encontrada.
        const receta = recetasEncontradas[0];
        // Guardamos el id de la receta para usarlo después en la actualización.
        recetaId = receta.id;
        // Rellenamos el formulario con los datos de la receta encontrada.
        form.nombre.value = receta.nombre;
        form.descripcion.value = receta.descripcion;
        form.ingredientes.value = receta.ingredientes;
        form.tiempo_min.value = receta.tiempo_min;
        form.dificultad.value = receta.dificultad;
        // También mostramos los datos de la receta en el div de resultados.
        divResultado.innerHTML +=
            "<div class='receta'>" +
            "<h2>" + receta.nombre + "</h2>" +
            "<p><strong>Descripción:</strong> " + receta.descripcion + "</p>" +
            "<p><strong>Ingredientes:</strong> " + receta.ingredientes + "</p>" +
            "<p><strong>Tiempo:</strong> " + receta.tiempo_min + " min</p>" +
            "<p><strong>Dificultad:</strong> " + receta.dificultad + "</p>" +
            "</div>";
    });

    // Obtenemos el formulario donde se actualizan los datos de la receta.
    const form = document.getElementById("formulario-update");

    // Cuando el usuario envía el formulario para actualizar la receta, ejecutamos esta función.
    form.addEventListener("submit", function (event) {
        // Evitamos que el formulario recargue la página.
        event.preventDefault();

        // Creamos un objeto con los datos actualizados de la receta.
        const recipeActualizar = {
            nombre: form.nombre.value,
            descripcion: form.descripcion.value,
            ingredientes: form.ingredientes.value,
            tiempo_min: parseInt(form.tiempo_min.value), // Convertimos el tiempo a número.
            dificultad: form.dificultad.value
        };

        // Usamos una función asíncrona para enviar los datos al servidor.
        (async () => {
            try {
                // Enviamos los datos actualizados al servidor usando PATCH (solo cambia lo necesario).
                const r = await fetch(`http://localhost:3000/recipes/${recetaId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(recipeActualizar),
                });
                // Convertimos la respuesta en un objeto y lo mostramos en consola.
                const data = await r.json();
                console.log(data);
            } catch (error) {
                // Si hay algún error, lo mostramos en consola.
                console.error(error);
            }
        })();
    });
})