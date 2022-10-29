import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { IngresoService } from 'src/app/Service/ingreso.service';
import { Router } from '@angular/router';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/Service/proveedor.service';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/Service/producto.service';
import { Ingreso } from 'src/app/models/ingreso';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {
titulo:string='Ingresos';

ingresos?:any=[]

  constructor(private ingresoService:IngresoService,
    private router:Router,
    private datosGlobales:DatosGlobalesService,
    private productoService: ProductoService) { }

  ngOnInit(): void {
    if((this.datosGlobales.logueado) &&((this.datosGlobales.rolLogueado === 'A ')||(this.datosGlobales.rolLogueado === 'B '))) {
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
    this.ingresoService.getAll().subscribe(
      ing=>{
        this.ingresos=ing
      }
    );
  }


  anularIngreso(id_ingreso?:number){
    Swal.fire({
      title: 'Anular',
      text:'Esta seguro de anular el Ingreso?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Anular',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
        if(result.isConfirmed){
          this.ingresoService.delete(id_ingreso).subscribe(
            (data)=>{
              this.ingresos = this.ingresos?.filter((ing:any)=> ing.id_ingreso!= id_ingreso);
              Swal.fire('Exito', 'El Ingreso se anulo con exito!', 'success')
            },
            (error)=>{
              Swal.fire('Error', 'Error al anular el Ingreso.', 'error')
            }
          );
        }
    })
  }

}
