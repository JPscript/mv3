const api_url = "https://api.artic.edu/api/v1/artworks";

async function loadData() {
    try {
        const response = await fetch(api_url);
        if(!response.ok){
            throw new Error("Error en la respuesta de la API");
        }
        const data = await response.json();
        loading.style.display = "none"; // Ocultar el mensaje de carga
        let info = data.data;
        let text = "";
        text += "<img src= https://www.artic.edu/iiif/2/2d484387-2509-5e8e-2c43-22f9981972eb/full/843,/0/default.jpg" + ">"

        for (let i = 0; i < info.length; i++) {
            // Crear la URL de la imagen
            let imageUrl = "https://www.artic.edu/iiif/2/" + info[i].image_id + "/full/843,/0/default.jpg";
            
            // Agregar el título y la imagen
            text += "<p><strong>Titulo:</strong> " + info[i].title + "<br>" +
                    "<img src='" + imageUrl + "' alt='" + info[i].title + "''></p>";
        }
        document.getElementById("data").innerHTML = text;
    } catch (e) {
        loading.style.display = "none"; // Ocultar el mensaje de carga
        error.style.display = "block"; // Mostrar el mensaje de error
        console.error(e); 
    }
}

loadData();