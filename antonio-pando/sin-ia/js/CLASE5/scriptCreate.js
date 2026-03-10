const baseUrl = "http://127.0.0.1:3000/recipes";

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
                tiempo: Number(formulario.tiempo.value),
                dificultad: formulario.dificultad.value,
                active: true,
            })
        });
        console.log(await r.json);
        if (respuesta.ok) {
            const resultado = await respuesta.json();
            console.log('¡Éxito!:', resultado);
            alert('Datos enviados correctamente');
        } else {
            console.error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error de red:', error);
    }

});




// POST (crear)
/*
(async () => {
    try {
        const r = await fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: form.nombre.value,
                descripcion: form.descripcion.value,
                ingredientes: form.ingredientes.value,
                tiempo: Number(form.tiempo.value),
                dificultad: form.dificultad.value,
                active: true,
            }),
        });
        console.log(await r.json());
    } catch (error) {
        console.error(error);
    }

})();*/