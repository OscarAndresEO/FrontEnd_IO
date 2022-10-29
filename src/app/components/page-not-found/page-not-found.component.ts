import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router:Router,
    private datosGlobales:DatosGlobalesService) { }

  ngOnInit(): void {
    if(!this.datosGlobales.logueado){
      this.router.navigate(['/']);
    }
  }

}
