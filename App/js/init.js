import { Collection } from './Collection.js';
import { Persistance } from './Persistance.js';

window.addEventListener("load", function() {
    // Lancement des classes
    launch();
    // Gestion du menu burger
    document.querySelector('.burger').addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('croix');
        document.querySelector('main').classList.toggle('ouvert');
    });
});

function launch() {
    let persiste = new Persistance(document.querySelector('body>aside>nav'), document.querySelector('body>main'));
    persiste.getCollections();

    let c = new Collection(document.querySelector('.notices>section'), document.querySelector('.series'), document.querySelector('.collection>section'), document.querySelector('.notice'), document.querySelector('#look'));
};

document.querySelector('#cherche').addEventListener('click', () => {
    console.log()
    document.querySelector('#look').classList.toggle('invisible');
});