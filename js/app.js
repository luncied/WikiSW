// let char = require('../addons/dataBases/characters');

// const myModal = document.getElementById('charSearchModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

const navbarBtns = document.getElementById('mainNavbarNav').getElementsByTagName("button");
const sitesPages = document.getElementsByClassName('section-page');
let contActBtn = [];

// event listener de cuando damos click en un boton del navbar
for (let i = 0; i < navbarBtns.length; i++) {
    navbarBtns[i].addEventListener('click', changePage);
};

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
