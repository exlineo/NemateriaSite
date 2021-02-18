import PARAMS from './static/params.js';
import { Donnees } from './static/datas.js';
import { Menu } from './Menu.js';

export class Persistance {

    static racine; // Racine des fichiers
    static contexte;

    menu;

    constructor(nav, corps) {
            this.menu = new Menu(nav, corps);
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
            localStorage.setItem(i, JSON.stringify(d));
            Donnees.collectionsP = d;
            console.log(Donnees, i, d);
        }
        /**
         * Renvoyer des données du localStorage
         * @param {string} i nom de la donnée à récupérer
         */
    getData(i) {
            return JSON.parse(localStorage.getItem(i));
        }
        /**
         * 
         */
    getCollections() {
        fetch(PARAMS.SERV + 'collections', PARAMS.HEAD)
            .then(d => d.json())
            .then(j => {
                console.log(j);
                this.setData('collections', j);
                this.setMenuData();
            })
    }
    getNotices(c) {

        }
        /**
         * Paramétrer le menu des collections à partir des données reçues
         */
    setMenuData() {
        this.menu.data = new Array();
        Donnees.collectionsP.forEach(
            m => this.menu.data.push({
                titre: m.titre,
                alias: m.alias,
                lien: "collection.html",
                infos: "Voir la collection",
                data: m
            })
        );
        this.menu.setMenu();
    }
}