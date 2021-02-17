import { Menu } from './Menu.js';
import { Persistance } from './Persistance.js';

window.addEventListener("load", function() {

    launch();

});

function launch() {
    let m = new Menu(document.querySelector('body>aside>nav'), document.querySelector('body>main'));
};