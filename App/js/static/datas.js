'use strict'
// Le menu dont nous aurons besoin
// export const menuP = [{
//         nom: "Accueil",
//         alias: 'accueil',
//         lien: "accueil.html",
//         infos: "Retourner à l'accueil"
//     },
//     {
//         nom: "Collections",
//         alias: 'collections',
//         lien: "collections.html",
//         infos: "Voir la liste des collections"
//     },
//     {
//         nom: "Contact",
//         alias: 'contact',
//         lien: "contact.html",
//         infos: "Envoyer un message"
//     }
// ];
export class Donnees {
    static collections = [];
    static notices = [];
    static page = {};
    static menu = [];

    contact = {
        mail: "simplon@fabriquenumerique.fr",
        sujet: "Merci de remplir les champs requis",
        alerte: "Attention, il manque des informations dans votre formulaire",
        ok: "Message envoyé"
    }
}