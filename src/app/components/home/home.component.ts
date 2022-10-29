import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:Router,
    private datosGlobales:DatosGlobalesService) { }

  ngOnInit(): void {
    if(!this.datosGlobales.logueado){
      this.router.navigate(['/']);
    }
  }

}
