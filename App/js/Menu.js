import { Donnees } from './static/datas.js';

export class Menu {

    nav;
    corps;
    data = [];
    collecEvent;

    constructor(el, c) {
        this.nav = el;
        this.corps = c;
        this.collecEvent = new CustomEvent('collection');
    };

    // Ecrire le menu dans le HTML
    setMenu() {
        this.setMenuItems();
    };
    /**
     * Lister les collections et créer les liens de menu
     */
    setMenuItems() {
            const ul = document.createElement('ul');
            let i = 0;
            // Boucle le menu pour générer les balises
            this.data.forEach(
                m => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    // a.setAttribute('href', '');
                    // a.setAttribute('click', `this.getTemplate('${m.lien}')`)
                    // li.onclick = () => this.getTemplate(m, i);
                    // 
                    a.setAttribute('title', m.infos);
                    a.setAttribute('data-index', i);
                    a.textContent = m.titre;
                    // a.addEventListener('mousedown', this.getTemplate(m.lien));
                    li.appendChild(a);
                    ul.appendChild(li);
                    // Gérer le clic sur un lien
                    a.onclick = (i) => {
                        this.setCollection(i);
                    };
                    // li.onclick = li.dispatchEvent(this.collecEvent);
                    ++i;
                });
            this.nav.appendChild(ul);
        }
        // Charger un template HTML
    loadTemplate() {
        console.log("template load");
    };
    /**
     * 
     * @param {Event} e Evénement reçu
     * @param {Object} m Collection à gérer
     */
    setCollection(i) {
            i.preventDefault();
            // Créer un événement pour envoyer l'information qu'une case a été cochée avec son ID (cf. Mecanique)
            const colEv = new CustomEvent('collection', { detail: i.target.dataset.index });
            dispatchEvent(colEv);
        }
        // Ecrire un template dans le DOM
    getTemplate(p, i) {
        fetch('./pages/' + p.lien)
            .then(h => h.text())
            .then(html => {
                this.corps.innerHTML = html;
                Donnees.page = { index: i, alias: p.alias };
            }).catch(er => console.log(er));
    }
}