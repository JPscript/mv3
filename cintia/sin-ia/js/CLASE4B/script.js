const api_url = "https://api.thecatapi.com/v1/images/search?limit=10";

async function loadData() {
    try {
        const response = await fetch(api_url);
        if(!response.ok){
            throw new Error("Error en la respuesta de la API");
        }
        const data = await response.json();
        loading.style.display = "none"; // Ocultar el mensaje de carga
        let info = data;
        let text = "";
        
        for (let i = 0; i < info.length; i++) {
            // Agregar el título y la imagen
            text += "<p>Titulo: " + info[i].id + 
            "<img src ='" + info[i].url + "'>" +  "</p>";
        }
        document.getElementById("data").innerHTML = text;
    } catch (e) {
        loading.style.display = "none"; // Ocultar el mensaje de carga
        error.style.display = "block"; // Mostrar el mensaje de error
        console.error(e); 
    }
}

loadData();