export interface SiteI {
    accueil: {
        titre:string;
        soustitre:string;
        separateur:string;
        logo_petit:string;
        logo_grand:string;
        intro:string;
        images:Array<any>;
    };
    presentation: {
        entete:string;
        titre:string;
        soustitre:string;
        intro:string;
        infos:Array<any>;
    };
    projets: {
        titre:string;
        soustitre:string;
        separateur:string;
        intro:string;
        projets:Array<any>;
    }
}
