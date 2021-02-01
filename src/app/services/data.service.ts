import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SiteI } from '../services/site-i';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data:SiteI=<SiteI>{};
  email:string = "contact@exlineo.com";

  constructor(private http:HttpClient) {
    this.getData();
  }
  getData(){
    this.http.get<SiteI>("/assets/data/site.json").subscribe(s => this.data = s);
  }
}
