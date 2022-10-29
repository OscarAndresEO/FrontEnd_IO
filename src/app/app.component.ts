import { Component, ChangeDetectorRef } from '@angular/core';
import { DatosGlobalesService } from './Service/datos-globales.service';
import { Router } from '@angular/router';
import { ProductoService } from './Service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidenav =false;
  constructor(private datosGlobales:DatosGlobalesService,
              private router:Router,
              private productoService:ProductoService){}
  ngOnInit(): void { 
    if(!this.datosGlobales.logueado){    
      this.router.navigate(['login']);
    }else{  
      let productos : any;
      this.productoService.getProductosMenoresDeCinco().subscribe(res=>{
        console.log('busca')
        productos = res;
        if(productos.length >1){
          Swal.fire({
            title: 'AVISO:',
            text: 'Hay productos que tienen existencia baja',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ver ahora',
            cancelButtonText: 'Ver mas tarde',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['productos']);
            } 
          });
        }else if(productos.length === 1){
          Swal.fire({
            title: 'AVISO:',
            text: 'El producto '+productos.nombre_producto+' tiene pocas existencias: '+productos.existencias,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ver ahora',
            cancelButtonText: 'Ver mas tarde',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['productos']);
            } 
          });
        }
      });
      this.sidenav = true;
    }
  }  

}
