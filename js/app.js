// **** VARIABLES **** //
// Selectores para el cambio de pagina
const navbarBtns = document.getElementById('mainNavbarNav').getElementsByTagName("button");
const sitesPages = document.getElementsByClassName('section-page');
let contActBtn = [];

// Selectores para crear personaje
const speciesSelect = document.querySelector('#new-char-species')
const planetSelect = document.querySelector('#new-char-planet')
const genSelect = document.querySelector('#new-char-gen')
let species = [];
let planets = [];
let gens = [];
let validatedDB = [];

// Selectores para el buscador de la pagina
const cardsCont = document.querySelector('#cards-container')

// Selector para el formulario de busqueda de wiki
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')


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
            showOptions(data);
            onloadData(data);
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
        sitesPages.namedItem(navbarBtns.namedItem(contActBtn[0]).name).classList.remove('d-flex');
        sitesPages.namedItem(navbarBtns.namedItem(contActBtn[0]).name).classList.add('d-none');
        contActBtn = [];
    };

   

    if(!actLink.classList.contains('active-link')){
        actLink.classList.add('active-link');
        actSite.classList.add('d-flex');
        actSite.classList.remove('d-none');
        contActBtn.push(actLink.name);
    };
};



// Funcion que escucha cuando damos al boton de busqueda y manda a llamar a formValue para obtener las cartas que coinciden con el nombre
function onloadData(data){
    searchForm.addEventListener('submit', e => {
        let searchValue = e.target[0].value;
        e.preventDefault()
        validatedDB = [];
        clearHTML(cardsCont);
        formValue(data, searchValue);
    });
};

// Funcion que busca el el valor asignado en la base de datos y devuelve las cards
function formValue(data, searchValue) {
        for(character of data){
            if (searchValue === ''){
                clearHTML(cardsCont);
                validatedDB = [];
                return;
            };
            if (character.name.toLowerCase().includes(searchValue)){
                validatedDB.push(character);
                loadWikiCards(validatedDB[0])
                return;
            };
        };
};

// Funcion que rellena los menus desplegables de CREA TU PERSONAJE
function showOptions(chardb){
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




// Funcion para ordenar JSON
function sortJSON(json, key) {
    return json.sort((a,b) => {
        let first = a[key]
        let second = b[key]
        return ((first < second) ? -1 : ((first > second) ? 1 : 0));
    })
}


// Funcion para cargar las tarjetas del WIKI
function loadWikiCards(charInfo){
    const {name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, species} = charInfo;
    const id = name.replace(' ', '-').replace(' ', '-');
    const img = `./img/charImg/${id}.jpg`
    let content = `
                    <div class="col mt-3">
                        <div class="card" style="width: 15rem;">
                            <img src="${img}" class="card-img-top" alt="${id}_img">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Especie: ${species}</li>
                                <li class="list-group-item">Planeta natal: ${homeworld}</li>
                            </ul>
                            <div class="card-body">
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-outline-info" data-bs-toggle="modal"
                                    data-bs-target="#${id}Modal">
                                    Desplegar
                                </button>

                                <!-- Modal -->
                                <div class="modal fade" id="${id}Modal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Personaje: ${name}</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
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
                                                </article>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-outline-danger"
                                                    data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `
    cardsCont.insertAdjacentHTML('beforeend', content)
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
