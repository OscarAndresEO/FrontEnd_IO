import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import { ProductoService } from 'src/app/Service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  titulo:string='Ventas';

ventas?:any=[]

  constructor(private router:Router,
    private datosGlobales:DatosGlobalesService,
    private productoService:ProductoService) { }

  ngOnInit(): void {
    if ((this.datosGlobales.logueado) &&((this.datosGlobales.rolLogueado === 'A ')||(this.datosGlobales.rolLogueado === 'V '))) {
      this.getAll();


      
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


    }else{
      this.router.navigate(['/']);
    }
  }

  getAll(){
    
  }
  
}
