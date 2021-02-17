import { Persistance } from './Persistance.js';
import { collectionsP, menuP, noticesP, pageP } from './static/datas.js';

export class Menu {

    corps;
    persiste;

    constructor(el, c) {
        this.persist = new Persistance();
        this.persist.getCollections();
        try {
            if (el) this.setMenu(el);
        } catch (er) {
            console.log("Erreur de chargement, merci de vérifier vos paramètres", er);
        }
        // Vérifier si le corps est envoyé
        try {
            if (c) this.corps = c;
        } catch (er) {
            console.log("Erreur de chargement, merci de vérifier vos paramètres", er);
        }
    };
    // Ecrire le menu dans le HTML
    setMenu(el) {
        const ul = document.createElement('ul');
        // Boucle le menu pour générer les balises
        menuP.forEach(
            m => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                // a.setAttribute('href', '');
                // a.setAttribute('click', `this.getTemplate('${m.lien}')`)
                li.onclick = () => this.getTemplate(m);
                a.setAttribute('title', m.infos);
                a.textContent = m.nom;
                // a.addEventListener('mousedown', this.getTemplate(m.lien));
                li.appendChild(a);
                ul.appendChild(li);
            }
        );
        el.appendChild(ul);
    };
    // Charger un template HTML
    loadTemplate() {
        console.log("template load");
    };
    // Ecrire un template dans le DOM
    getTemplate(p) {
        console.log(p);
        fetch('./pages/' + p.lien)
            .then(h => h.text())
            .then(html => {
                this.corps.innerHTML = html;
                page = p.alias;
                console.log(this, page);
            }).catch(er => console.log(er));
    }
}