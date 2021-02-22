import { Persistance } from './Persistance.js';
import { Donnees } from './static/datas.js';
import { Notice } from './notice.js';
import PARAMS from './static/params.js';

export class Collection {

    index;
    collection = {};
    n; // Notices HTML
    s; // L'entête des notices pour ecrires les séries
    c; // Collection HTML
    o; // Notice HTML à afficher
    f; // Champ de filter pour rechercher dans les notices

    constructor(n, s, c, o, f) {
            this.n = n;
            this.s = s;
            this.c = c;
            this.o = o;
            this.f = f;
            addEventListener('collection', (e) => {
                this.index = parseInt(e.detail);
                this.collection = Donnees.collections[this.index];
                // Charger les notices
                this.loadNotices();
                // Afficher la collection
                this.setCollection();
            });
            /**
             * Fermer la notice avec la croix
             */
            this.o.querySelector('i').addEventListener('click', () => {
                this.o.classList.toggle('vu');
                this.notice = null;
            });
            // Filtrer les notices
            this.f.addEventListener('input', () => {
                if (this.f.value.length > 3) {
                    this.setNotices(this.filtreNotices(this.f.value));
                } else {
                    this.setNotices(Donnees.notices);
                }
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
                    // afficher les notices
                    this.setNotices(Donnees.notices);
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
            this.setSeries();
        }
        /**
         * Afficher les séries de la collection
         */
    setSeries(){
        if(this.collection.series && Array.isArray(this.collection.series)){
            this.s.innerHTML = '';
            
            const h = document.createElement('header');
            const h1 = document.createElement('h1');
            h1.textContent = "Filtrer par séries";
            h.className ='jaune';
            h.appendChild(h1);
            this.s.appendChild(h);

            const ar = document.createElement('article');
            this.collection.series.forEach(s => {
                let b = document.createElement('button');
                b.textContent = s;
                ar.appendChild(b);
                console.log(s);
                b.addEventListener('click', ()=>{
                    this.setNotices(this.setNoticesSeriees(s));
                })
            });
            this.s.appendChild(ar);
        }
    }
    /**
     * Récupérer les notices d'une série
     * @param {string} s Nom de la série servant de tri
     */
    setNoticesSeriees(s){
        return Donnees.notices.filter(n => n.metadonnees[0].nemateria.serie && n.metadonnees[0].nemateria.serie.serie == s);
    }
    filtreNotices(filtre){
        return Donnees.notices.filter(n => {
            const f = filtre.toLowerCase();
            if(n.metadonnees[0].dublincore.title && n.metadonnees[0].dublincore.title.toLowerCase().indexOf(f) !== -1) return n;
            if(n.metadonnees[0].dublincore.description && n.metadonnees[0].dublincore.description.toLowerCase().indexOf(f) !== -1) return n;
            if(n.metadonnees[0].dublincore.subject && n.metadonnees[0].dublincore.subject.toString().toLowerCase().indexOf(f) !== -1) return n;
        });
            return Donnees.notices;
    }
        /**
         * Créer les notices à la volée
         */
    setNotices(notices){
            this.n.innerHTML = '';
            notices.forEach(n => {
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