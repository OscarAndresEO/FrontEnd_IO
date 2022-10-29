import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ProveedorService } from 'src/app/Service/proveedor.service';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  proveedores:any={
  }

  constructor(private proveedorService:ProveedorService,
    private router: Router,
    private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
    if(this.datosGlobales.logueado){
      this.getAll();
    }else{
      this.router.navigate(['/']);
    }
  }
  downloadPdf(){
    var doc = new jsPDF;
    autoTable(doc,{html:"#pdf"});
    doc.save("Proveedores");
  ;
}
  getAll(){
    this.proveedorService.getAll().subscribe(
      prov=>{
        this.proveedores=prov
      }
    );
  }


  deleteProveedor(id_proveedor?:number){
    Swal.fire({
      title: 'Eliminar',
      text:'Esta seguro de eliminar el Proveedor?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
        if(result.isConfirmed){
          console.log(id_proveedor);
          this.proveedorService.delete(id_proveedor).subscribe(
            (data)=>{
              this.proveedores = this.proveedores?.filter((prov:any)=> prov.id_proveedor!= id_proveedor);
              Swal.fire('Exito', 'El Proveedor se elimino con exito!', 'success')
              this.getAll()
            },
            (error)=>{
              Swal.fire('Error', 'Error al eliminar al Proveedor.', 'error')
            }
          );
        }
    })
  }
}
