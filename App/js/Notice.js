export class Notice {
    metas; // Métadonnées de la notice
    n; // Elément HTML

    constructor(n, metas) {
            this.n = n;
            this.media = n.querySelector('#media'); // Element HTML pour afficher le média
            this.media.innerHTML = '';

            this.donnees = n.querySelector('#donnees'); // Element HTML pour lister les données
            this.donnees.innerHTML = '';

            this.metas = metas; // Métadonnées de la notice

            let f = this.metas.dublincore.format;
            if (f.indexOf('image') != -1) {
                this.setImage(this.metas.media.url);
            } else if (f.indexOf('video') != -1) {
                this.setVideo(this.metas.media.url, f);
            } else if (f.indexOf('audio') != -1) {
                this.setAudio(this.metas.media.url, f)
            } else {
                this.setPdf(this.metas.media.url);
            }

            // Ecrire les données dans les médias
            this.setDatas(this.metas.dublincore, "Métadonnées du média");

            for (let n in this.metas.nemateria) {
                this.setDatas(this.metas.nemateria[n], "Nemateria : " + n);
            }
        }
        /**
         * Afficher les informations du document
         * @param {Element} doc Element HTML du document
         */
    setMedia() {
            const ar = document.createElement('article');
            const h3 = document.createElement('h3');
            h3.textContent = "Informations sur le média";
            ar.appendChild(h3);
            ar.appendChild(this.decortiqueObj(this.metas.media));
            this.media.appendChild(ar);
        }
        /**
         * Afficher les métadonnées
         */
    setDatas(o, t) {
            const ar = document.createElement('article');
            const h3 = document.createElement('h3');
            h3.textContent = t;
            ar.appendChild(h3);
            ar.appendChild(this.decortiqueObj(o));
            this.donnees.appendChild(ar);
        }
        /**
         * Afficher les séquences d'un document multimédia
         */
    setSequences() {

        }
        /**
         * Décomposer un objet et ses enfants
         * @param {Object} o Objet présumé à décortiquer
         * @param {*} e Clé potentielle d'un objet décortiqué
         */
    decortiqueObj(o, e = null) {
            const ul = document.createElement('ul');
            for (let i in o) {
                if (typeof o[i] == 'object') {
                    this.decortiqueObj(o[i], i);
                } else {
                    let li = document.createElement('li');
                    li.textContent = `${i} : ${o[i].toString()}`;
                    ul.appendChild(li);
                }
            };
            return ul;
        }
        /**
         * Afficher une vidéo
         * @param {string} url Lien de la vidéo
         * @param {string} f Format de la vidéo
         */
    setVideo(url, f) {
            const ar = document.createElement('article');
            let vid = `<video controls class="media">
                    <source src="${url}" type="${f}">
                    Votre navigateur ne supporte pas ce format vidéo
                </video>`;
            ar.innerHTML = vid;
            this.media.appendChild(ar);
            this.setMedia();
        }
        /**
         * 
         * @param {string} url Adresse du média
         * @param {string} f Format de l'audio
         */
    setAudio(url, f) {
            const ar = document.createElement('article');
            let aud = `<audio controls src="${url}" class="media">
                        Votre navigateur ne supporte pas ce format audio
                </audio>`;

            ar.innerHTML = aud;
            this.media.appendChild(ar);
            this.setMedia();
        }
        /**
         * Afficher une image
         * @param {string} url Lien vers le document
         */
    setImage(url) {
            const ar = document.createElement('ar');
            let img = new Image();
            img.src = url;
            img.className = 'media';
            ar.appendChild(img);
            this.media.appendChild(ar);
            // let img = `<img src="${url}" class="media">`;
            this.setMedia();
        }
        /**
         * Afficher un fichier PDF
         * @param {string} url Lien vers le document
         */
    setPdf(url) {
        const ar = document.createElement('ar');
        let img = new Image();
        img.src = url;
        img.className = 'media';
        ar.appendChild(img);
        this.media.appendChild(ar);
        // let img = `<img src="${url}" class="media">`;
        this.setMedia();
    }
}