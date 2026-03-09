const API_URL = "https://ffxivcollect.com/api/mounts";

async function loadData(){
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        const tarjetas = data.results;
        console.log(tarjetas);
        let salida = "<ul>";
        let tamano = tarjetas.length;
        for (let i = 0; i < tamano; i++) {
            console.log(tarjetas[i].name);
            salida += "<li>"+"<div class='imagen'><img src="+tarjetas[i].image+" alt="+tarjetas[i].name+"></div>"+"<div class='texto'><h2>"+tarjetas[i].name+"</h2><p>"+tarjetas[i].description+"</p></div></li>";
        }
        salida += "</ul>";
        document.getElementById("resultado").innerHTML = salida;
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

loadData();