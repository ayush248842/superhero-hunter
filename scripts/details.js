const name = document.getElementById('superhero-name');
const image = document.getElementById('superhero-img');
const fav = document.getElementById('favourite');
const snackbar = document.getElementById('snackbar');

// getting details from superhero id
const params = new URLSearchParams(window.location.search);
var id = params.get('id');

//favourites from localstorage
var favList = JSON.parse(localStorage.getItem("favList")) === null
    ? []
    : JSON.parse(localStorage.getItem("favList"));


//fetching details from API
fetch(`https://superheroapi.com/api.php/1953802511419258/${id}`)
    .then(res => res.json())
    .then(data => showDetails(data))
    .catch(err => console.log(err));


function showDetails(data) {

    name.innerHTML = data.name;

    image.src = data.image.url;
    image.alt = "Image not found";

    favList.includes(id)
        ?
        fav.innerHTML = '<i id="fav-icon" class="fas fa-heart fa-4x"></i>'
        :
        fav.innerHTML = '<i id="fav-icon" class="far fa-heart fa-4x"></i>'

    for (var i in data.powerstats) {
        document.getElementById(i).innerHTML = data.powerstats[i] + "%";
        document.getElementById(i).style.width = data.powerstats[i] + "%"
    }

    for (var i in data.appearance) {
        document.getElementById(i).innerHTML = data.appearance[i];
    }

    for (var i in data.biography) {
        document.getElementById(i).innerHTML = data.biography[i];
    }

    for (var i in data.work) {
        document.getElementById(i).innerHTML = data.work[i];
    }

    for (var i in data.connections) {
        document.getElementById(i).innerHTML = data.connections[i];
    }
}

//add to favourites 
fav.onclick = function () {
    if (!favList.includes(id)) {
        favList.push(id);
        fav.innerHTML = '<i id="fav-icon" class="fas fa-heart fa-4x"></i>';
        showSnackbar(true);

    }else {
        var i = favList.indexOf(id);
        favList.splice(i, 1);
        fav.innerHTML = '<i id="fav-icon" class="far fa-heart"></i>';
        showSnackbar(false);
    }

    localStorage.setItem("favList", JSON.stringify(favList));
}

function showSnackbar(value) {

    snackbar.classList.add('visible');

    if (value) {
        snackbar.innerHTML = "Added to Favourites";
    }
    else {
        snackbar.innerHTML = "Removed from Favourites";
    }
    // snackbar timeout
    setTimeout(function () { snackbar.classList.remove("visible"); }, 3000);
}