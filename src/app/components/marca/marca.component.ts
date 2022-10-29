import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Marca } from 'src/app/models/marca';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import { MarcaService } from 'src/app/Service/marca.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {
  titulo: string = "Marcas";

  marcas?: Marca[];

  constructor(private marcaService: MarcaService, private router: Router,
    private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
    if (this.datosGlobales.logueado) {
      this.getAll();
    } else {
      this.router.navigate(['/']);
    }
  }

  getAll() {
    this.marcaService.getAll().subscribe(
      marca => this.marcas = marca
    );
  }
  downloadPdf(){
    var doc = new jsPDF;
    autoTable(doc,{html:"#pdf"});
    doc.save("marcas");
  ;
}

  deleteMarca(id_marca?: number) {
    Swal.fire({
      title: 'Eliminar',
      text: 'Esta seguro de eliminar la Marca?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.delete(id_marca).subscribe(
          (data) => {
            this.marcas = this.marcas?.filter((marca: any) => marca.id_marca != id_marca);
            Swal.fire('Exito', 'La Marca se elimino con exito!', 'success')
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la Marca.', 'error')
          }
        );
      }
    })
  }
}
