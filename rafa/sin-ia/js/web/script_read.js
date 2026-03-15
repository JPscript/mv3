const API_URL = 'http://localhost:3000/recipes';

// READ ALL

function getReadCard(nombre, ingredientes, id) {
  return '<div class = readCard> <a href="read1.html?id=' + id + '"> <h3>' + nombre + '</h3> <p>' + ingredientes + '</p></a> </div> '
}

async function readAll() {
  try {
    const response = await fetch(API_URL, { method: "GET" });
    const data = await response.json();
    console.log("data: ", data);
    let info = data;
    let fLen = data.length;
    for (let i = 0; i < fLen; i++) {
      let myDiv = document.createElement("div");
      myDiv.setAttribute("id", "div" + info[i].id);
      document.getElementById("read").appendChild(myDiv);
      let content = "";
      content += getReadCard(info[i].nombre, info[i].ingredientes, info[i].id);
      document.getElementById("div" + info[i].id).innerHTML = content;
    }

  } catch (error) {
    console.log("Network error");
  }
}
readAll();
