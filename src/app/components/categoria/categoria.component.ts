import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import { MarcaService } from 'src/app/Service/marca.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  titulo:string="Categorias";

  categorias?:Categoria[];

  constructor(private categoriaService:CategoriaService,
              private router:Router,
              private datosGlobales:DatosGlobalesService
  ) { }

  ngOnInit(): void {
    if((this.datosGlobales.logueado)&&((this.datosGlobales.rolLogueado !== 'V '))){
      this.getAll();
    }else{
      this.router.navigate(['/']);
    }
    
  }
  
  fechaMostrar?: Date = new Date();
  downloadPdf(){
      var doc = new jsPDF;
      autoTable(doc,{html:"#pdf"});
      doc.save("categorias");
    ;
  }

  getAll(){
    this.categoriaService.getAll().subscribe(
      cat=>this.categorias=cat
    );
  }

  deleteCategoria(id_categoria?:number){
    Swal.fire({
      title: 'Eliminar',
      text:'Esta seguro de eliminar la Categoria?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result)=>{
        if(result.isConfirmed){
          this.categoriaService.delete(id_categoria).subscribe(
            (data)=>{
              this.categorias = this.categorias?.filter((cat:any)=> cat.id_categoria!= id_categoria);
              Swal.fire('Exito', 'La Categoria se elimino con exito!', 'success')
            },
            (error)=>{
              Swal.fire('Error', 'Error al eliminar la Categoria.', 'error')
            }
          );
        }
    })
  }

}
