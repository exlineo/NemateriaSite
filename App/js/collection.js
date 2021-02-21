import { Persistance } from './Persistance.js';
import { Donnees } from './static/datas.js';
import { Notice } from './notice.js';
import PARAMS from './static/params.js';

export class Collection {

    index;
    collection = {};
    n; // Notices HTML
    c; // Collection HTML
    o; // Notice HTML à afficher

    constructor(n, c, o) {
            this.n = n;
            this.c = c;
            this.o = o;
            addEventListener('collection', (e) => {
                this.index = parseInt(e.detail);
                this.collection = Donnees.collections[this.index];
                // Charger les notices
                this.loadNotices();
                // Afficher la collection
                this.setCollection();
                console.log("Evénement reçu", this.index, this.collection);
            });
            /**
             * Fermer la notice avec la croix
             */
            this.o.querySelector('i').addEventListener('click', () => {
                this.o.classList.toggle('vu');
                this.notice = null;
            });
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
                    console.log("Notices chargées", n);
                    // afficher les notices
                    this.setNotices();
                })
                .catch(e => console.log(e));
        }
        /**
         * Renseigner la collection
         */
    setCollection() {
            this.c.innerHTML = '';
            const ar = document.createElement('article');
            let details = `
                <h3>${this.collection.titre}</h3>
                <p>${this.collection.description}</p>
            `;
            ar.innerHTML = details;
            const u = document.createElement('ul');
            // let li = document.createElement('li');
            let li = `
                ${this.collection.alias ? `<li>Alias : ${this.collection.alias}</li>` : null}
                ${this.collection._id ? `<li>_id : ${this.collection._id}</li>` : null}
                <ul>
                    ${this.collection.createur ? `<li>Créateur : ${this.collection.createur}</li>` : null}
                    ${this.collection.fonds ? `<li>Fonds : ${this.collection.fonds}</li>` : null}
                    ${this.collection.date ? `<li>Date : ${this.collection.date}</li>` : null}
                    ${this.collection.type ? `<li>Type : ${this.collection.type}</li>` : null}
                    ${this.collection.langue ? `<li>Langue : ${this.collection.langue}</li>` : null}
                </ul>
            `;

            u.innerHTML = li;
            ar.appendChild(u);
            this.c.appendChild(ar);
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
                a.innerHTML = `<span><img src="assets/img/icones/icone_oeil.svg" alt="${db.title}" class="icone" ></span>`;
                ar.style.backgroundImage = `url(${media.url})`;
                const p = document.createElement('p');
                p.setAttribute('title', db.title);
                p.innerHTML = `<h3>${db.title}</h3><span>${db.description.substr(0,100)}...</span>`;

                ar.appendChild(p);
                ar.appendChild(a);
                this.n.appendChild(ar);

                ar.addEventListener('click', ()=>{
                    console.log(this, this.o);
                    this.o.classList.toggle('vu');
                    this.notice = new Notice(this.o, n);
                })
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