// 1. Seleccionamos el formulario por su etiqueta (mirar como hacerlo por el ID)

const form = document.querySelector('form');

// 2. Escuchamos el evento 'submit'

form.addEventListener('submit', async (event) => {

    // 3. Evitamos que la página se recargue (que es un comportamiento por defecto)
    
    event.preventDefault();

    // 4. Extraemos los valores de los inputs usando sus atributos "name"

    const nombreUser = form.nombre.value.trim();
    const descripcionUser = form.descripcion.value.trim();
    const ingredientesUser = form.ingredientes.value.trim();
    const tiempoUser = Number(form.tiempo_min.value);
    const dificultadUser = form.dificultad.value;
    const imagenUser = form.imagen.files[0];                    // Captura el archivo de imagen

    // --- VALIDACIÓN ---
    //Hacemos una validación de que todos los campos necesarios esten rellenos

    let camposFaltantes = [];

    if (!nombreUser) camposFaltantes.push("Nombre");                //Si falta el nombre añadimos nombre a campos faltantes
    if (!descripcionUser) camposFaltantes.push("Descripción");      //Si falta la descripción añadimos descripción a campos faltantes
    if (!ingredientesUser) camposFaltantes.push("Ingredientes");    //Si faltan los ingredientes añadimos los ingredientes a campos faltantes
    if (!tiempoUser) camposFaltantes.push("Tiempo mínimo");         //Si falta el tiempo mínimo añadimos tiempo a campos faltantes

    // 5. Si hay campos vacíos, mostramos el mensaje y detenemos la función

    if (camposFaltantes.length > 0) {
        alert("Por favor, rellena los siguientes campos obligatorios: " + camposFaltantes.join(", "));
        return; // Esto hace que no se ejecute el fetch
    }

    
    // Solo añadimos la imagen si el usuario seleccionó una

    var imagenSeleccionada = false;
    if (imagen) {
        imagenSeleccionada = true;
    }
    
    // --- LLAMADA A LA API PARA METER TODO MENOS LA IMAGEN---

    const baseUrl = 'http://localhost:3000/recipes';

    // POST (crear)
        
    try {
        const r = await fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: nombreUser,  
                descripcion: descripcionUser,
                ingredientes: ingredientesUser,
                tiempo_min: tiempoUser,
                dificultad: dificultadUser
            }),
        });
        //console.log(await r.json());
        if (r.ok) {
            alert("¡Receta creada con éxito!");
        } else {
            alert("Error al guardar la receta en el servidor.");
        }
        // FORM-DATA (subida de archivo)
        const nuevaReceta = await r.json();
        console.log("Receta creada:", nuevaReceta);
        // --- SUBIDA DE IMAGEN (Si el usuario metió imagen y la receta se creó) ---
        // Usamos el ID que nos devuelve la API (nuevaReceta.id)
        if (imagenSeleccionada && nuevaReceta.id) {
            const formData = new FormData();
            formData.append("image", imagenUser);
            const resImagen = await fetch(`${baseUrl}/${nuevaReceta.id}/image`, {
                method: "POST",
                body: formData,
            });
            console.log("Imagen subida:", await resImagen.json());
            if(resImagen.ok) {
                alert("¡Imagen subida con éxito!");
            }
            else {
                alert("Error al subir la imagen al servidor. Intentar subir de otra manera o más tarde.");
            }
        }
        window.location.href = "../main/mainRecetas.html"; // Redirigir al mainRecetas.html al finalizar
    } catch (error) {
        console.error(error);
        alert("Error al conectar con el servidor. Por favor, intenta de nuevo más tarde.");
    }

});