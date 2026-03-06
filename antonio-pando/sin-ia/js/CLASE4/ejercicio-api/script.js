const API_URL = "https://potterapi-fedeperin.vercel.app/es/books"

async function loadData() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();
        
        let tamano = data.length;

        let text = "";
        data.forEach(book => {
            text += `
                <div class="tarjeta">
                    <img src="${book.cover}" alt="Portada de ${book.title}"/>
                    <div class="detalles">
                        <p>TITULO: ${book.title}</p>
                        <p>FECHA SALIDA: ${book.releaseDate}</p><p>PAGINAS: ${book.pages} paginas</p></div></div>`;
        });

        document.getElementById("info").innerHTML = text;
    } catch (error) {
        console.log("Network error");
    }
}

loadData()