// **** VARIABLES **** //
// Selectores para el cambio de pagina
const navbarBtns = document.getElementById('mainNavbarNav').getElementsByTagName("button");
const sitesPages = document.getElementsByClassName('section-page');
let contActBtn = [];

// Selectores para crear personaje
const speciesSelect = document.querySelector('#new-char-species');
const planetSelect = document.querySelector('#new-char-planet');
const genSelect = document.querySelector('#new-char-gen');
let species = [];
let planets = [];
let gens = [];
let validatedDB = [];

// Selectores para el buscador y el wiki de la pagina
const searchCont = document.querySelector('#cards-container');
const wikiCont = document.querySelector('#wiki-sw');

// Selector que me permite acceder a la pestaña de top5
const favCont = document.querySelector('#fav-sw-char');

// Generar un objeto de Modal de bootstrap para el wiki y el search a travez del id
// const wikiModal = new bootstrap.Modal('#wiki-modal',{});
// const searchModal = new bootstrap.Modal('#search-modal',{});
const generalModal = new bootstrap.Modal('#general-modal',{});

// Selector para el formulario de busqueda de wiki
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');


// **** EVENT LISTENERS **** //

// Event listener de cuando damos click en un boton del navbar
for (let i = 0; i < navbarBtns.length; i++) {
    navbarBtns[i].addEventListener('click', changePage);
};

// Event listener que ocurre cuando carga la pagina
document.addEventListener('DOMContentLoaded', () => {
    fetch('./assets/data/characters.json')
        .then((response) => response.json())
        .then((data) => {
            loadCharCards(data, wikiCont, generalModal);
            searchCharacter(data);
            // showOptions(data);
        })
        .catch(error => console.error(error));
    // showCharacters(); // Muestra los personajes de la busqueda
});


// **** FUNCTIONS **** //

// Funcion de Cambio de pagina
function changePage(e){
    actLink = e.target;
    actSite = sitesPages.namedItem(actLink.name);

    if(contActBtn.length != 0){
        navbarBtns.namedItem(contActBtn[0]).classList.remove('active-link');
        sitesPages.namedItem(navbarBtns.namedItem(contActBtn[0]).name).classList.remove('d-block');
        sitesPages.namedItem(navbarBtns.namedItem(contActBtn[0]).name).classList.add('d-none');
        contActBtn = [];
    };

    if(!actLink.classList.contains('active-link')){
        actLink.classList.add('active-link');
        actSite.classList.add('d-block');
        actSite.classList.remove('d-none');
        contActBtn.push(actLink.name);
    };

    if(actSite.id === "top-5-char") {
        getFavs();
    }
};


// Funcion que escucha cuando damos al boton de busqueda y manda a llamar a formValue para obtener las cartas que coinciden con el nombre
function searchCharacter(data){
    searchForm.addEventListener('submit', e => {
        let searchValue = e.target[0].value;
        e.preventDefault()
        clearHTML(searchCont);
        formValue(data, searchValue);
    });
};

// Funcion que busca el el valor asignado en la base de datos y devuelve las cards
function formValue(data, searchValue) {
    validatedDB = [];
    for(character of data){
        if (searchValue === ''){
            validatedDB = [];
            return;
        };
        if (character.name.toLowerCase().includes(searchValue.toLowerCase())){
            validatedDB.push(character);
        };
    };

    loadCharCards(validatedDB, searchCont, generalModal);
};


// Funcion para cargar las tarjetas del WIKI
function loadCharCards(data = [], selector, modal){
    // Elimina los elementos viejos en caso de que se haga una nueva busqueda en la pestaña search 
    clearHTML(selector);

    // Iteramos sobre los datos del json
    data.forEach(char => {
        const {name, homeworld, species} = char;
        const id = name.replace(' ', '-').replace(' ', '-');
        const img = `./img/charImg/${id}.jpg`
        const charContainer = document.createElement('div');

        charContainer.classList.add('col', 'mt-3');

        const charCard = document.createElement('div');
        charCard.classList.add('card'); 
        charCard.style = "width: 15rem;"

        const charImg = document.createElement('img');
        charImg.classList.add('card-img-top');
        charImg.alt = `${id}_img`;
        charImg.src = img;

        const charCardBody = document.createElement('div'); 
        charCardBody.classList.add('card-body');

        const charHeading = document.createElement('h4');
        charHeading.classList.add('card-title');
        charHeading.textContent = name;
        
        const charBtn = document.createElement('button');
        charBtn.classList.add('btn', 'btn-outline-info', 'w-100');
        charBtn.textContent = 'Desplegar Información';

        // Esto le da funcionalidad al boton despues de que cargan los elementos del html
        charBtn.onclick = function (){
            modalChar(char, modal);
        }

        const charSummary = document.createElement('ul');
        charSummary.classList.add('list-group', 'list-group-flush');

        const charElmentSpecies = document.createElement('li');
        charElmentSpecies.classList.add('list-group-item');
        charElmentSpecies.textContent = `Especie : ${species}`;

        const charElmentWorld = document.createElement('li');
        charElmentWorld.classList.add('list-group-item');
        charElmentWorld.textContent = `Planeta natal : ${homeworld}`;

        // ordenar html
        charSummary.appendChild(charElmentSpecies);
        charSummary.appendChild(charElmentWorld);

        charCardBody.appendChild(charHeading);
        charCardBody.appendChild(charSummary);
        charCardBody.appendChild(charBtn);

        charCard.appendChild(charImg);
        charCard.appendChild(charCardBody);

        charContainer.appendChild(charCard);

        selector.appendChild(charContainer);

    });
};

function modalChar (char, modal) {
    const {name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, species} = char;
    const id = name.replace(' ', '-').replace(' ', '-');
    const img = `./img/charImg/${id}.jpg`
    
    // Seleccionamos el titulo y el body de los modals tomando el elemento hermano del selector de cards en el que estamos
    const modalTitle = document.querySelector('#modal-title');
    const modalBody = document.querySelector('#modal-body');
    const modalFooter = document.querySelector('#modal-footer');

    modalTitle.textContent = name
    modalBody.innerHTML = `
                            <article>
                                <img src="${img}" class="card-img-top" alt="${id}_img">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Altura: ${height} cm</li>
                                    <li class="list-group-item">Peso: ${mass} kg</li>
                                    <li class="list-group-item">Color de cabello: ${hair_color}</li>
                                    <li class="list-group-item">Tes: ${skin_color}</li>
                                    <li class="list-group-item">Color de ojos: ${eye_color}</li>
                                    <li class="list-group-item">Año de nacimiento: ${birth_year}</li>
                                    <li class="list-group-item">Genero: ${gender}</li>
                                    <li class="list-group-item">Planeta natal: ${homeworld}</li>
                                    <li class="list-group-item">Especie: ${species}</li>
                                </ul>
                            </article>`

    clearHTML(modalFooter);

    // Botones del modal
    const btnFavorites = document.createElement('button');
    btnFavorites.classList.add('btn', 'btn-outline-secondary', 'col');
    btnFavorites.textContent = uniqueStorage(name) ? 'Eliminar de favoritos' : 'Añadir a favoritos';
        // Añade los favs a local storage
    btnFavorites.onclick = function(){

        if(uniqueStorage(name)){
            deleteFavorite(name);
            btnFavorites.textContent = 'Añadir a favoritos'; // Cuando eliminamos el registro cambiamos el texto del boton
            clearHTML(favCont);
            getFavs();
            return 
        };
        addFavorites(char);
        btnFavorites.textContent = 'Eliminar de favoritos'
    };

    const btnClose = document.createElement('button');
    btnClose.classList.add('btn', 'btn-outline-danger', 'col');
    btnClose.textContent = 'Cerrar';
    btnClose.onclick = function(){
        modal.hide();
    };

    modalFooter.appendChild(btnFavorites);
    modalFooter.appendChild(btnClose);

    // Muestra el modal
    modal.show();
};

// Funcion que agrega los favoritos detectados por en "onclic" del boton y los guarda en localStorage
function addFavorites (obj){
    const fav = JSON.parse(localStorage.getItem('favs')) ?? [];
    localStorage.setItem('favs', JSON.stringify([...fav, obj]));
}

// Funcion que elimina los favs ya guardados en local storage
function deleteFavorite (name){
    const fav = JSON.parse(localStorage.getItem('favs')) ?? [];
    const favRefresh = fav.filter(fav => fav.name !== name);
    localStorage.setItem('favs', JSON.stringify(favRefresh)); // Actualiza la lista que ya estaba guardada en el localStorage
}

// Funcion que reviza que no haya duplicados en el localStorage
function uniqueStorage (name) {
    const fav = JSON.parse(localStorage.getItem('favs')) ?? [];
    return fav.some(fav => fav.name === name); // Devuelve True si ya hay un elemento con ese nombre en LS y False si no hay
}

// Funcion que obtiene los favoritos del Local Storage
function getFavs () {
    const fav = JSON.parse(localStorage.getItem('favs')) ?? [];
    const favContParent = favCont.parentElement;
    if(fav.length) {
        loadCharCards(fav, favCont, generalModal);
        if (favContParent.lastChild.localName === 'p'){
            favContParent.removeChild(favContParent.lastChild);
        }
        return
    };

    if(favContParent.children[1]){
        console.log(favContParent.lastChild.localName)
        favContParent.removeChild(favContParent.lastChild);
    };

    const emptyFavs = document.createElement('p');
    emptyFavs.textContent = 'Aún no has agregado personajes de SW favoritos';
    emptyFavs.classList.add('fs-4', 'text-center', 'font-bold', 'mt-5');
    favContParent.appendChild(emptyFavs);
}

// Funcion que rellena los menus desplegables de CREA TU PERSONAJE
function showOptions (chardb){
    chardb.forEach(char => {
        species.push(char.species);
        planets.push(char.homeworld);
        gens.push(char.gender);
    });

    // Los sets no almacenan valores duplicados
    const uniqueSpecies = [...new Set(species)].sort();
    const uniquePlanets = [...new Set(planets)].sort();
    const uniqueGens = [...new Set(gens)].sort();


    uniqueGens.forEach(gen => {
        const option = document.createElement('option');
        option.value = gen;
        option.textContent = gen.charAt(0).toUpperCase() + gen.slice(1); // Capitalize the word
        genSelect.appendChild(option); 
    });

    uniquePlanets.forEach(planet => {
        const option = document.createElement('option');
        option.value = planet;
        option.textContent = planet.charAt(0).toUpperCase() + planet.slice(1); // Capitalize the word
        planetSelect.appendChild(option); 
    });

    uniqueSpecies.forEach(specie => {
        const option = document.createElement('option');
        option.value = specie;
        option.textContent = specie.charAt(0).toUpperCase() + specie.slice(1); // Capitalize the word
        speciesSelect.appendChild(option); 
    });
};


function clearHTML (element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    };
};

// Faltan
/* 
MAndalorianos
YAddle
Grogu
Quinlan Vos
Rex
Wolfie
Gregor
Ahsoka
Ezra
Kanan
Demas jedi
*/
