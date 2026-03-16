// Esperamos a que el DOM (estructura de la página web) esté completamente cargado.
// Así nos aseguramos de que todos los elementos existen antes de trabajar con ellos.
document.addEventListener("DOMContentLoaded", function () {
    // Seleccionamos el botón para mostrar todas las recetas.
    // Usamos 'const' porque el valor no cambiará.
    const btnTodas = document.getElementById("btn-todas");
    // Seleccionamos el campo de texto para buscar por nombre.
    const inputBuscar = document.getElementById("buscar-nombre");
    // Seleccionamos el botón para buscar por nombre.
    const btnBuscar = document.getElementById("btn-buscar");
    // Seleccionamos el div donde se mostrarán los resultados.
    const divResultado = document.getElementById("resultado");

    // Añadimos un "escuchador" (listener) para el evento 'click' del botón.
    // Cuando el usuario pulse el botón, se ejecutará esta función.
    btnTodas.addEventListener("click", async function (event) {
        // Pedimos a la API la lista de recetas usando fetch.
        // 'await' espera a que la respuesta llegue.
        const r = await fetch("http://localhost:3000/recipes");
        // Convertimos la respuesta a JSON (array de recetas).
        const recetas = await r.json();
        // Limpiamos el div de resultados antes de mostrar nuevas recetas.
        divResultado.innerHTML = "";
        // Si el array está vacío, mostramos un mensaje.
        if (!recetas.length) {
            divResultado.innerHTML = "No hay recetas disponibles";
            return;
        }
        // Recorremos el array de recetas y mostramos cada una.
        recetas.forEach(function(receta) {
            // Creamos un bloque de HTML para cada receta.
            
            divResultado.innerHTML +=
                "<div class='receta'>" +
                "<h2>" + receta.nombre + "</h2>" +
                "<p><strong>Descripción:</strong> " + receta.descripcion + "</p>" +
                "<p><strong>Ingredientes:</strong> " + receta.ingredientes + "</p>" +
                "<p><strong>Tiempo:</strong> " + receta.tiempo_min + " min</p>" +
                "<p><strong>Dificultad:</strong> " + receta.dificultad + "</p>" +
                "</div>";
        });
    });
    btnBuscar.addEventListener("click", async function(events) {
        // Pedimos a la API la lista de recetas usando fetch.
        // 'await' espera a que la respuesta llegue.
        const r = await fetch("http://localhost:3000/recipes");
        // Convertimos la respuesta a JSON (array de recetas).
        const recetas = await r.json();

        // Obtenemos el texto que el usuario ha escrito en el input de búsqueda.
        // Usamos .value para acceder al valor actual del input.
        // Ejemplo: si el usuario escribe "tarta", textoBuscado será "tarta".
        // Esto nos permite luego filtrar las recetas por ese texto.
        const textoBuscado = inputBuscar.value;

        // Filtramos el array de recetas para quedarnos solo con las que coinciden con el texto buscado.
        // Usamos .filter() para crear un nuevo array solo con las recetas que cumplen la condición.
        // Convertimos tanto el nombre de la receta como el texto buscado a minúsculas para ignorar mayúsculas/minúsculas.
        // .includes() comprueba si el nombre contiene el texto buscado.
        // Si la condición es true, la receta se incluye en el array filtrado.
        const recetasFiltradas = recetas.filter(function(receta) {
            return receta.nombre.toLowerCase().includes(textoBuscado.toLowerCase());
        });

        // Limpiamos el div de resultados antes de mostrar nuevas recetas.
        divResultado.innerHTML = "";

        // Si el array filtrado está vacío, mostramos un mensaje.
        if (!recetasFiltradas.length) {
            // Mostramos un mensaje claro si no hay coincidencias.
            divResultado.innerHTML = "No hay recetas disponibles";
            return;
        }

        // Recorremos el array de recetas filtradas y mostramos cada una.
        // Usamos forEach para ejecutar la función para cada receta encontrada.
        recetasFiltradas.forEach(function(receta) {
            // Creamos un bloque de HTML para cada receta.
            // Usamos template literals (comillas invertidas y ${}) para insertar variables.
            divResultado.innerHTML +=
                "<div class='receta'>" +
                "<h2>" + receta.nombre + "</h2>" +
                "<p><strong>Descripción:</strong> " + receta.descripcion + "</p>" +
                "<p><strong>Ingredientes:</strong> " + receta.ingredientes + "</p>" +
                "<p><strong>Tiempo:</strong> " + receta.tiempo_min + " min</p>" +
                "<p><strong>Dificultad:</strong> " + receta.dificultad + "</p>" +
                "</div>";
        });
    })
})