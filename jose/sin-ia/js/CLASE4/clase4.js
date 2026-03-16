
// Definimos una constante con la URL de la API que vamos a consultar.
// Usamos 'const' porque la URL no va a cambiar durante la ejecución.
const API_URL = "https://starwars-databank-server.vercel.app/api/v1/characters";

// Obtenemos el elemento del DOM que muestra el estado (mensajes para el usuario).
const estado = document.getElementById("estado");

// Obtenemos el elemento del DOM donde se van a mostrar las tarjetas.
const tarjetas = document.getElementById("tarjetas");

// Función principal que carga los datos desde la API y los muestra en pantalla.
// Usamos 'async' para poder esperar la respuesta de la API con 'await'.
async function loadData() {
    // Cambiamos el texto del estado para avisar que estamos cargando datos.
    estado.textContent = "Cargando datos...";
    try {
        // Hacemos la petición a la API usando fetch y esperamos la respuesta.
        const respuesta = await fetch(API_URL);
        // Convertimos la respuesta a formato JSON para poder trabajar con los datos.
        const datos = await respuesta.json();
        // Accedemos al array principal de personajes dentro del objeto recibido.
        const lista = datos.data;
        // Inicializamos una variable para ir acumulando el HTML de las tarjetas.
        let htmlTarjetas = "";
        // Recorremos el array de personajes usando un bucle for clásico.
        for (let i = 0; i < lista.length; i++) {
            // Guardamos el personaje actual en la variable 'item'.
            const item = lista[i];
            // Generamos una tarjeta visual con imagen, nombre y descripción en bloques separados.
            htmlTarjetas += `
                            <div class="tarjeta">
                                <img src="${item.image}" alt="${item.name}">
                                <p class="nombre">${item.name}</p>
                                <button> Ver descripcion </button>
                                <div class="descripcion">${item.description}</div>
                            </div>
                        `;
        }
        
        // Mostramos todas las tarjetas generadas en el contenedor del DOM.
        tarjetas.innerHTML = htmlTarjetas;

        // Seleccionamos todos los botones que están dentro de las tarjetas.
        const botones = document.querySelectorAll('.tarjeta button');

        // Recorremos cada botón para añadirle un evento 'click'.
        botones.forEach(function (boton) {
            // Cuando el usuario hace clic en el botón...
            boton.addEventListener('click', function () {
                // Buscamos el elemento de descripción dentro de la misma tarjeta.
                const descripcion = boton.parentElement.querySelector('.descripcion');
                const tarjeta = boton.parentElement;
                // Si la descripción está oculta (display: none o vacío), la mostramos.
                if (descripcion.style.display === 'none' || descripcion.style.display === '') {
                    descripcion.style.display = 'block';
                    boton.textContent='ocultar descripcion';
                    tarjeta.classList.add('mostrar-descripcion');
                } else {
                    // Si ya está visible, la ocultamos.
                    descripcion.style.display = 'none';
                    tarjeta.classList.remove('mostrar-descripcion');
                    boton.textContent='Ver descripcion';
                }
            });
        });
        // Actualizamos el estado para mostrar cuántas tarjetas se han pintado.
        estado.textContent = "Tarjetas mostradas: " + lista.length;
    } catch (error) {
        // Si ocurre un error (por ejemplo, la API no responde), avisamos al usuario.
        estado.textContent = "Error al cargar datos.";
        // Limpiamos el contenedor de tarjetas para no mostrar datos incorrectos.
        tarjetas.innerHTML = "";
    }
}

// Llamamos a la función principal para que se ejecute al cargar la página.

// Llamamos a la función principal para que se ejecute al cargar la página.
// Esto inicia la carga de datos y el pintado de las tarjetas.
loadData();