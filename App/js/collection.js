import { Persistance } from './Persistance.js';
import { Donnees } from './static/datas.js';
import { Notice } from './Notice.js';
import PARAMS from './static/params.js';

export class Collection {

    indexC; // Index de la collection
    indexN; // Index de la notice en cours
    collection = {};
    n; // Notices HTML
    s; // L'entête des notices pour ecrires les séries
    c; // Collection HTML
    o; // Notice HTML à afficher
    f; // Champ de filter pour rechercher dans les notices

    constructor(n, s, c, o, f) {
            this.n = n; // Données 
            this.s = s;
            this.c = c;
            this.o = o; // Notice à afficher
            this.f = f;
            addEventListener('collection', (e) => {
                this.indexC = parseInt(e.detail);
                this.collection = Donnees.collections[this.indexC];
                this.o.classList.remove('vu');
                // Charger les notices
                this.loadNotices();
                // Afficher la collection
                this.setCollection();
            });
            /**
             * Fermer la notice avec la croix
             */
            this.o.querySelector('.notice>i').addEventListener('click', () => {
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
            let i=0;
            notices.forEach(n => {
                const db = n.metadonnees[0].dublincore;
                const media = n.metadonnees[0].media;
                const ar = document.createElement('article');
                ar.dataset.i = i;
                ++i;
                // this.listeObjet(n.metadonnees);
                const a = document.createElement('a');

                // Adapter l'affichage en fonction du format du document
                if(db.format){
                    if (db.format.indexOf('image') != -1) {
                        ar.style.backgroundImage = `url(${media.url})`;
                    } else if (db.format.indexOf('application') != -1)  {
                        ar.style.backgroundImage = `url(assets/img/icones/picto_docs.png)`;
                    } else {
                        // Ajouter des éléments au 
                        // let c = document.createElement('div');
                        if (db.format.indexOf('video') != -1) {
                            a.innerHTML = this.setVideo(media.url, db.format);
                        } else if (db.format.indexOf('audio') != -1) {
                            a.innerHTML = this.setAudio(media.url, db.format);
                        }
                        // a.appendChild(c);
                        a.addEventListener('mouseenter', (e)=>{
                            e.currentTarget.childNodes[0].play();
                        });
                        a.addEventListener('mouseleave', (e)=>{
                            e.currentTarget.childNodes[0].pause();
                        })
                    }
                }

                const pict = document.createElement('p');
                pict.innerHTML = `<span><img src="assets/img/icones/icone_oeil.svg" alt="${db.title}" class="icone"></span>`;
                // ar.style.backgroundImage = `url(${media.url})`;
                const p = document.createElement('p');
                p.setAttribute('title', db.title);
                p.innerHTML = `<h3>${db.title}</h3><span>${db.description.substr(0,100)}...</span>`;

                a.appendChild(pict);
                ar.appendChild(p);
                ar.appendChild(a);
                this.n.appendChild(ar);

                ar.addEventListener('click', ()=>{
                    this.slide();
                    this.indexN = ar.dataset.i;
                    this.notice = new Notice(this.o, n.metadonnees[0]);
                })
            });
            // Activer le diaporama des notices
            this.setDiaporama();
        }
    setNoticeBg(){
        let bg;
    }
        /**
         * Lister et afficher le contenu d'un objet
         * @param {any} obj objet à tester pour créer une liste
         */
    listeObjet(obj) {
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
    /**
         * Afficher une vidéo
         * @param {string} url Lien de la vidéo
         * @param {string} f Format de la vidéo
         */
    setVideo(url, f) {
        return `<video class="media">
                <source src="${url}" type="${f}">
                Votre navigateur ne supporte pas ce format vidéo
        </video>`;
    }
        /**
         * 
         * @param {string} url Adresse du média
         * @param {string} f Format de l'audio
         */
    setAudio(url, f) {
            return `<audio src="${url}" class="media">
                        Votre navigateur ne supporte pas ce format audio
                </audio>`;
        }
        /**
         * Afficher un fichier PDF
         * @param {string} url Lien vers le document
         */
    setPdf(url) {
        return ``;
    }
    play(el){

    }
    pause(el){

    }
    /**
     * Activer le diaporama avec les flêches de la notice
     */
    setDiaporama(){
        const gauche = this.o.querySelector('.fleche.gauche');
        const droite = this.o.querySelector('.fleche.droite');
        gauche.addEventListener('click', (e)=>{
            console.log(this.indexN);
            if(this.indexN > 0) {
                this.notice = new Notice(this.o, Donnees.notices[--this.indexN].metadonnees[0]);
            }
        });
        droite.addEventListener('click', (e)=>{
            console.log(this.indexN);
            if(this.indexN < Donnees.notices.length) {
                this.notice = new Notice(this.o, Donnees.notices[++this.indexN].metadonnees[0]);
            }
        });
    }
    slide(){
        this.o.classList.toggle('vu');
    }
}