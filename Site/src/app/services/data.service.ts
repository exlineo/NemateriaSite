import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SiteI } from '../services/site-i';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data:SiteI=<SiteI>{};
  email:string = "contact@exlineo.com";
  langue:string = 'fr';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };
  // Données de test vers AWS
  page = {
    alias:"nouvellepage",
    soustitre: "Logiciel de gestion de collections numérisées",
    entete: "/assets/images/martin-adams-unsplash.jpg",
    titre: "Test de POST",
    infos: [
        {
        lien: "https://youtube.com/playlist?list=PL713RdHI3Hr2FNXXP4-jP4S4KQQ4S7mbk",
        titre: "Tutoriels vidéo",
        infos: "Accéder à la chaîne des tutoriels pour apprendre le déploiement ou l'utiisation des différents outils du projet."
        }
    ],
    intro: "<p>Initiative privée.</p>"
};

  constructor(private http:HttpClient) {
    this.getData();
    // this.getAWSData();
  }
  // Changer de langue
  setLangue(l:string){
    this.langue = l;
    this.getData();
  }
  // Récupérer les données locales en attendant
  getData(){
    this.http.get<SiteI>(`/assets/data/${this.langue}/site.json`).subscribe(s => this.data = s);
  }
  // Récupérer les données depuis AWS
  getAWSData(){
    this.http.get('https://2cit6jose0.execute-api.eu-west-3.amazonaws.com/nemateria-site/site').subscribe( w => console.log('données AWS', w))
  }
  // Tester le post pour une admin
  postAWSData(){
    this.http.post('https://2cit6jose0.execute-api.eu-west-3.amazonaws.com/nemateria-site-admin', JSON.stringify(this.page), this.httpOptions).subscribe(retour => console.log(retour));
  }
}
