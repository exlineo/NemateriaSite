import { Persistance } from './Persistance.js';
import { Donnees } from './static/datas.js';

export class Collection {

    index;
    collection;

    constructor() {
        addEventListener('collection', (e) => {
            this.index = parseInt(e.detail);

            this.collection = Donnees.collectionP[this.index];
            console.log(this.index, Donnees, this.collection);
        })
    }
}