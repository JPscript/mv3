const API_URL = 'https://buffy-angel-api.onrender.com/api/actors';


function getCard(profilePicture, name, characterPlayed, imdbProfile){
  return  '<div class = singleCard> <img src="' + profilePicture + '" alt= "' + name + '"> <h3>' + name + '</h3> <p>' + characterPlayed + '</p> <a href="' + imdbProfile + '">Ir a su perfil</a> </div> '
}

async function loadData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("data: ",data);
    let info = data;
    let fLen = 16;
    let content = "";
    for(let i= 0; i<fLen; i++){
      try{
        const responseImage = await fetch(info[i].profilePicture);
        console.log("imagen: ", responseImage);
        content += getCard(info[i].profilePicture, info[i].name, info[i].characterPlayed, info[i].imdbProfile);
      } catch (error) {
        console.log("Image error");
      } 
    }
    document.getElementById("card").innerHTML = content;
  } catch (error) {
    console.log("Network error");
  }
}
loadData();
