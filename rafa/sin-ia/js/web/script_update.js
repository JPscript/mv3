const API_URL = 'http://localhost:3000/recipes';

// READ ALL

function getReadCard(nombre, ingredientes, id) {
  return '<div class = readCard><h3>' + nombre + '</h3> <p>' + ingredientes + '</p></div> '
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
      myDiv.setAttribute("id", info[i].id);
      document.getElementById("read").appendChild(myDiv);
      let content = "";
      content += getReadCard(info[i].nombre, info[i].ingredientes, info[i].id);
      document.getElementById(info[i].id).innerHTML = content;
      let myButton = document.createElement("button");
      myButton.setAttribute("id", "btn" + info[i].id);
      myButton.setAttribute("class", "btn");
      myButton.innerHTML = "Edit";
      document.getElementById(info[i].id).appendChild(myButton);
    }
  } catch (error) {
    console.log("Network error");
  }
}
readAll();

async function modal() {

  await readAll();

  //get the modal
  var modal = document.getElementById("modal");
  //get the button that opens the modal
  var btns = document.querySelectorAll(".btn");

  //get the span element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  //when the user clicks on span (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }
  //when the user clicks the button, open the modal
  btns.forEach((btn) => {
    btn.onclick = function () {
      modal.style.display = "block";
    }
  })
  //when the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
modal();