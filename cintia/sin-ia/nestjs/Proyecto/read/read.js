const api_url = "http://localhost:3000/recipes";

async function verRecetas() {
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API");
        }
        const data = await response.json();
        let info = data;
        let text = "";

        for (let i = 0; i < info.length; i++) {
            text +=
                "<div class='card'>" +
                    "<p>Titulo: " + info[i].nombre + "</p>" +
                    "<p>Ingredientes: " + info[i].ingredientes + "</p>" +
                    "<p>Tiempo elaboracion: " + info[i].tiempo_min + "</p>" +
                    "<p>Dificultad: " + info[i].dificultad + "</p>" +
                "</div>";
        }
        document.getElementById("data").innerHTML = text;  
        }
      
    catch (e) {
        console.error(e);
    }
}

verRecetas();

/*Con esta función 1º se hace un fetch (función que se usa para hacer peticiones HTTP a un servidor),
2º la respuesta se convierte a JSON
3º se recorre el array y se traducen los datos a HTML para mostrarlos en la página web*/