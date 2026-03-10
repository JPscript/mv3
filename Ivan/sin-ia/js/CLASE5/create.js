// Esperamos a que todo el HTML de la pagina se cargue antes de buscar elementos del DOM.
// "DOMContentLoaded" evita errores por intentar usar elementos que aun no existen en pantalla.
document.addEventListener("DOMContentLoaded", function () {

    // Buscamos el formulario por su id.
    // Ojo: aqui se esta buscando un elemento con id "create.html".
    const form = document.getElementById("createForm");
    // Escuchamos el evento "submit" del formulario (cuando el usuario pulsa enviar).
    form.addEventListener("submit", function (event) {
        // Evita que el navegador recargue la pagina al enviar el formulario.
        // Asi podemos manejar el envio con JavaScript y fetch.
        event.preventDefault();

        // Creamos el objeto "receta" con los datos del formulario.
        // Este objeto se convertira a JSON para enviarlo al backend.
        const receta = {

            // Tomamos el valor del campo "nombre".
            nombre: form.nombre.value,

            // Tomamos el valor del campo "descripcion".
            descripcion: form.descripcion.value,

            // Tomamos el valor del campo "ingredientes".
            ingredientes: form.ingredientes.value,

            // Convertimos el tiempo a numero entero con parseInt.
            // Es util porque en el input llega como texto.
            tiempo_min: parseInt(form.tiempo_min.value),

            // Tomamos el valor del campo "dificultad".
            dificultad: form.dificultad.value

        }

        // Hacemos una peticion HTTP POST a la API para crear una receta.
        // fetch devuelve una Promesa (promesa de un resultado futuro).
        fetch("http://localhost:3000/recipes", {

            method: "POST",
            // Indicamos que enviamos datos en formato JSON.
            headers: { "Content-Type": "application/json" },
            // Convertimos el objeto JavaScript a texto JSON.
            body: JSON.stringify(receta)

        })

            // Cuando llega la respuesta del servidor, ejecutamos esta funcion async.
            .then(async function (response) {
                // Intentamos leer el cuerpo de la respuesta como JSON.
                const data = await response.json();

                // Si la respuesta es exitosa (status 2xx)
                if (response.ok) {
                    // Creamos un <p> para mostrar mensaje de exito al usuario.
                    let mensaje = document.createElement('p');
                    mensaje.textContent = 'Receta creada correctamente.';
                    form.appendChild(mensaje);

                    // Limpiamos todos los campos del formulario.
                    form.reset();

                    // Quitamos el mensaje despues de 3 segundos.
                    setTimeout(() => mensaje.remove(), 3000);
                } else {
                    // Si hay error del servidor, mostramos el mensaje que venga de la API.
                    let mensaje = document.createElement('p');
                    mensaje.textContent = 'Error: ' + (data.message || JSON.stringify(data));
                    form.appendChild(mensaje);

                    // Quitamos el mensaje de error despues de 5 segundos.
                    setTimeout(() => mensaje.remove(), 5000);
                }
            })
            // Si ocurre un error de red (por ejemplo, servidor apagado), entramos aqui.
            .catch(error => {
                // Mostramos detalle tecnico en consola para depuracion.
                console.error(error);

                // Mostramos un mensaje amigable al usuario en la pagina.
                let mensaje = document.createElement('p');
                mensaje.textContent = 'Error de red al crear la receta.';
                form.appendChild(mensaje);

                // Quitamos el mensaje despues de 5 segundos.
                setTimeout(() => mensaje.remove(), 5000);
            });
    }); // Cierra el form.addEventListener
}); // Cierra el document.addEventListener