import PARAMS from './static/params.js';
import { collectionsP } from './static/datas.js';

export class Persistance {

    static racine; // Racine des fichiers
    static contexte;

    constructor() {

        }
        /**
         * Etablir la racine de la page en cours
         * @param {string} r La racine de la page actuelle
         */
    setRacine(r) {
        try {
            if (r) this.racine = r;
        } catch (er) {
            console.log("Erreur dans la donnée", er);
        }
    };
    /**
     * Sauvegarder des données dans le localStorage
     * @param {string} i nom de la donnée à sauvegarder
     * @param {any} d données à sauvegarder
     */
    setData(i, d) {
            localStorage.setItem(i, d);
        }
        /**
         * Renvoyer des données du localStorage
         * @param {string} i nom de la donnée à récupérer
         */
    getDate(i) {
            return localStorage.getItem(i);
        }
        /**
         * 
         */
    getCollections() {
        fetch(PARAMS.SERV + 'collections', PARAMS.HEAD)
            .then(d => d.json())
            .then(j => {
                collectionsP = j;
                console.log(collectionsP);
            })
    }
    getNotices(c) {

    }
}