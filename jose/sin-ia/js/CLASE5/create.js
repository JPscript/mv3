	// Esperamos a que el DOM (la estructura de la página web) esté completamente cargado.
	// Así nos aseguramos de que todos los elementos existen antes de trabajar con ellos.
	document.addEventListener("DOMContentLoaded", function() {
		// Seleccionamos el formulario usando su id 'formulario-create'.
		// Esto nos permite acceder a los datos que el usuario escriba.
		const form = document.getElementById("formulario-create");

		// Añadimos un "escuchador" (listener) para el evento 'submit' del formulario.
		// Cuando el usuario pulse el botón de enviar, se ejecutará esta función.
		form.addEventListener("submit", function(event) {
			// Evitamos que el formulario se envíe de forma tradicional (recargando la página).
			event.preventDefault();

			// Creamos un objeto llamado 'receta' que contiene todos los datos del formulario.
			// Cada propiedad del objeto corresponde a un campo del formulario.
			const receta = {
				// Tomamos el valor del campo 'nombre'.
				nombre: form.nombre.value,
				// Tomamos el valor del campo 'descripcion'.
				descripcion: form.descripcion.value,
				// Tomamos el valor del campo 'ingredientes'.
				ingredientes: form.ingredientes.value,
				// Tomamos el valor del campo 'tiempo_min'.
				tiempo_min: parseInt(form.tiempo_min.value),
				// Tomamos el valor del campo 'dificultad'.
				dificultad: form.dificultad.value
				
			};

			// Enviamos la receta a la API usando fetch.
			fetch("http://localhost:3000/recipes", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(receta)
			})
			// Cuando la API responde, convertimos la respuesta a JSON.
			.then(async function(response)  {
				const data = await response.json();
				// Si la respuesta es exitosa (status 2xx)
				if (response.ok) {
					let mensaje = document.createElement('p');
					mensaje.textContent = 'Receta creada correctamente.';
					form.appendChild(mensaje);
					form.reset();
					setTimeout(() => mensaje.remove(), 3000);
				} else {
					// Si hay error, mostramos el mensaje de la API
					let mensaje = document.createElement('p');
					mensaje.textContent = 'Error: ' + (data.message || JSON.stringify(data));
					form.appendChild(mensaje);
					setTimeout(() => mensaje.remove(), 5000);
				}
			})
			// Si ocurre un error de red, lo mostramos en consola y al usuario.
			.catch(error => {
				console.error(error);
				let mensaje = document.createElement('p');
				mensaje.textContent = 'Error de red al crear la receta.';
				form.appendChild(mensaje);
				setTimeout(() => mensaje.remove(), 5000);
			});
		}); // Cierra el form.addEventListener
	}); // Cierra el document.addEventListener
        
