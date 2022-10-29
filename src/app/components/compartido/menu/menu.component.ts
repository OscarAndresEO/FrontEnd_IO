import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
    private datosGlobales:DatosGlobalesService) { }

  ngOnInit(): void {
    if (!this.datosGlobales.logueado) {
      this.router.navigate(['/']);
    }
  }

  navegar(url: string) {
    this.router.navigate([url]);
  }

}
