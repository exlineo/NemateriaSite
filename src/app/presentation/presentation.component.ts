import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {
  
  email:string = "contact@exlineo.com";

  constructor(public dataServ:DataService) { }

  ngOnInit(): void {
  }

}
