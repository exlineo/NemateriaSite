import { Persistance } from './Persistance.js';
import { Donnees } from './static/datas.js';
import PARAMS from './static/params.js';

export class Collection {

    index;
    collection = {};
    n;
    c;

    constructor(n, c) {
            this.n = n;
            this.c = c;
            addEventListener('collection', (e) => {
                this.index = parseInt(e.detail);
                this.collection = Donnees.collections[this.index];
                // Charger les notices
                this.loadNotices();
                // Afficher la collection
                this.setCollection();
                console.log("Evénement reçu", this.index, this.collection);
            })
        }
        /**
         * Récupérer les notices de la collection
         */
    loadNotices() {
            let n = JSON.stringify(this.collection.notices);
            fetch(PARAMS.SERV + 'notices/collection', PARAMS.setPOST(n))
                .then(d => d.json())
                .then(n => {
                    Donnees.notices = n;
                    console.log("Notices chargées");
                })
                .catch(e => console.log(e));
        }
        /**
         * Renseigner la collection
         */
    setCollection() {
            this.c.innerHTML = '';
            const a = document.createElement('article');
            const u = document.createElement('ul');
            for (let i in this.collection) {
                let li = document.createElement('li');
                li.textContent = i + ' : ' + this.collection[i];
            }
            this.c.appendChild(a);
            // aficher les notices
            this.setNotices();
        }
        /**
         * Créer les notices à la volée
         */
    setNotices() {
            this.n.innerHTML = '';
            Donnees.notices.forEach(n => {
                const db = n.metadonnees[0].dublincore;
                const media = n.metadonnees[0].media;
                const ar = document.createElement('article');
                // this.listeObjet(n.metadonnees);
                const a = document.createElement('a');
                a.innerHTML = `<span><img src="assets/img/icone_oeil.svg" alt="${db.title}" ></span>`;
                ar.style.backgroundImage = `url(${media.url})`;
                const p = document.createElement('p');
                p.setAttribute('title', db.title);
                p.innerHTML = `<h3>${db.title}</h3><span>${db.description.substr(0,125)}</span>`;


                ar.appendChild(p);
                ar.appendChild(a);
                this.n.appendChild(ar);
            });
        }
        /**
         * Lister et afficher le contenu d'un objet
         * @param {any} obj objet à tester pour créer une liste
         */
    listeObjet(obj) {
        console.log(obj);
        let u = document.createElement('ul');
        if (!Array.isArray(obj) && typeof obj == 'object') {
            for (let i in obj) {
                let li = document.createElement('li');
                li.textContent = i + ' : ' + li[i];
                u.appendChild(li);
            }
        } else {
            let li = document.createElement('li');
            li.textContent = obj.toString();
            u.appendChild(li);
        }

        return u;
    }
}