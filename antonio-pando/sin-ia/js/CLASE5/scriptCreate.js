const baseUrl = "http://localhost:3000/recipes";

const formulario = document.getElementById('formulario');


formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se refresque

    try {
        const r = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: formulario.nombre.value,
                descripcion: formulario.descripcion.value,
                ingredientes: formulario.ingredientes.value,
                tiempo_min: Number(formulario.tiempo.value),
                dificultad: formulario.dificultad.value,
            })
        });
        const resultado = await r.json();
        if (r.ok) {
            console.log('¡Éxito!:', resultado);
            alert('Datos enviados correctamente');
        } else {
            console.error('Error en la respuesta del servidor');
            alert('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de red')
    }

});