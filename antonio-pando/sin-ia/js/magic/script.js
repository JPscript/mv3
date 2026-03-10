const API_LIBROS = "https://potterapi-fedeperin.vercel.app/es/books"
const API_PERSONAJES = "https://potterapi-fedeperin.vercel.app/es/characters"

async function loadDataLibros() {
    try {
        let response = await fetch(API_LIBROS);
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

async function loadDataPersonajes() {
    try {
        let response = await fetch(API_PERSONAJES);
        let data = await response.json();

        let tamano = data.length;

        let text = "";
        data.forEach(character => {
            text += `
                <div class="tarjeta">
                    <img src="${character.image}" alt="Portada de ${character.nickname}"/>
                    <div class="detalles">
                        <p>NOMBRE COMPLETO: ${character.fullName}</p>
                        <p>AÑO DE NACIMIENTO: ${character.birthdate}</p>
                        <p>INTERPRETADO POR: ${character.interpretedBy}</p>
                    </div>
                </div>`;
        });

        document.getElementById("info").innerHTML = text;
    } catch (error) {
        console.log("Network error");
    }
}
