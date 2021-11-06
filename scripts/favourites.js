var favList = JSON.parse(localStorage.getItem("favList"));
if (favList == null)
    favList = [];

const snackbar = document.getElementById('snackbar');
const favCard = document.getElementById('fav-card');

if (favList.length === 0)
    favCard.innerHTML = '<div style="margin: 10%; text-align: center; color: white;">Error! Favourites List Empty.<div>'

for (let id of favList) {
    fetch('https://superheroapi.com/api.php/1953802511419258/' + id + '/image')
        .then(res => res.json())
        .then(data => createCard(data, id))
        .catch(err => console.log(err))
}

//create cards
function createCard(data, id) {
    var card = document.createElement('div');
    card.classList.add('card');
    var cardImage = document.createElement('img');
    cardImage.setAttribute('id', 'superhero-img');
    cardImage.classList.add('avatar');
    var cardName = document.createElement('h1');
    cardName.classList.add('superhero-name');
    var favButton = document.createElement('div');
    var detailsButton = document.createElement('div');
    detailsButton.innerHTML = 'Know Me';
    detailsButton.classList.add('detailsButton');
    detailsButton.setAttribute('id', 'details-btn')

    card.appendChild(cardImage);
    card.appendChild(cardName);
    card.appendChild(favButton);
    card.appendChild(detailsButton);
    card.setAttribute('id', id);

    cardImage.src = data.url;
    cardName.innerHTML = data.name;
    favButton.innerHTML = '<i id="fav-icon" class="fas fa-heart"></i>';
    favCard.appendChild(card);
}

//remove Superheroes from favourites
favCard.onclick = function (event) {    
    var target = event.target;
    console.log("target", target)
    //when know me button is clicked.
    if (target.id === 'details-btn') {
        var id = target.parentNode.getAttribute('id');
        console.log("id", id);
        window.open("details.html?id=" + id, "_self");
    }

    //when favourite button is clicked
    if (target.id === 'fav-icon') {
        target.parentNode.parentNode.remove();
        showSnackbar();
        var i = favList.indexOf(id);
        favList.splice(i, 1);
    }
    //updating localstorage 
    localStorage.setItem("favList", JSON.stringify(favList));

    if (favList.length === 0)
        favCard.innerHTML = '<div style="margin: 10%; text-align: center; color: white;">Error! Favourites List Empty.<div>'
}

//snackbar
function showSnackbar() {
    snackbar.classList.add('visible');
    snackbar.innerHTML = "Removed from Favourites";

    //snackbar-timeout
    setTimeout(function () { snackbar.classList.remove("visible"); }, 3000);
}