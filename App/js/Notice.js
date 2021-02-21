export class Notice {
    notice; // Métadonnées de la notice
    n; // Elément HTML

    constructor(n) {
            this.notice = n;
            console.log(this.notice);
        }
        /**
         * 
         */
    setNotice() {

    }
    decortiqueObj(o) {
        if (Array.isArray(o)) {
            return o.toString();
        } else if (typeof o == 'object') {
            for (let i in o) {
                this.decortiqueObj(o[i]);
            }
        }
        return o;
    }
}