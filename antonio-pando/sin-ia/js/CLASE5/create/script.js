// URL base de la API donde se gestionan las recetas
const baseUrl = "http://localhost:3000/recipes";

// Tomamos el elemento <form id="formulario"> del DOM
const formulario = document.getElementById('formulario');

// Escuchamos el evento 'submit' del formulario. La función es asincrónica
// porque hacemos peticiones de red con fetch.
formulario.addEventListener('submit', async (e) => {
    // Evitamos que el navegador recargue la página al enviar el formulario
    e.preventDefault();

    // Variables para almacenar el resultado y el id devuelto por la API
    let id = null;
    let resultado = null;

    try {
        // Enviamos los campos del formulario como JSON al endpoint POST /recipes
        // Observa que aquí usamos Content-Type: application/json y JSON.stringify
        const r = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Accedemos a los inputs por su name dentro del formulario
                nombre: formulario.nombre.value,
                descripcion: formulario.descripcion.value,
                ingredientes: formulario.ingredientes.value,
                // Aseguramos que 'tiempo' sea número
                tiempo_min: Number(formulario.tiempo.value),
                dificultad: formulario.dificultad.value,
            })
        });

        // Intentamos parsear la respuesta JSON (si el servidor la devuelve)
        resultado = await r.json();
        // Guardamos el id si viene en la respuesta (útil para subir la imagen)
        id = resultado && resultado.id ? resultado.id : null;

        console.log(resultado);
        console.log('ID creado:', id);

        // Ahora comprobamos si el usuario seleccionó un fichero en el input 'imagen'
        // Nota: el input en el HTML tiene name="imagen" y type="file"
        const fileInput = formulario.imagen;
        // Subimos el fichero usando FormData al endpoint /recipes/:id/image
        const file = fileInput.files[0];
        const fd = new FormData();
        // El backend (en NestJS) espera el campo con nombre 'image'
        fd.append('image', file);

        // IMPORTANTE: al usar FormData no ponemos Content-Type manualmente;
        // el navegador lo establece con el boundary correcto.
        const uploadRes = await fetch(`${baseUrl}/${id}/image`, {
            method: 'POST',
            body: fd,
        });

        if (uploadRes.ok) {
                const uploadResult = await uploadRes.json();
                console.log('Imagen subida:', uploadResult);
            alert('Datos e imagen enviados correctamente');
        } else {
            // La subida falló (por ejemplo, 4xx o 5xx)
            console.error('Error subiendo imagen:');
            alert('Receta creada, pero fallo al subir la imagen');
        }

    } catch (error) {
        // Capturamos errores de red o excepciones en fetch/JSON
        console.error('Error:', error);
        alert('Error');
        return;
    }
})