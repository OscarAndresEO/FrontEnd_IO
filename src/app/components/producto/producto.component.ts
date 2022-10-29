import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/Service/producto.service';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  titulo: string = 'Motos';

  productos: any = {

  }

  constructor(private productoService: ProductoService,
    private router: Router,
    private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
    if (this.datosGlobales.logueado) {
      this.getAll();
    } else {
      this.router.navigate(['/']);
    }
  }
  downloadPdf(){
    var doc = new jsPDF;
    autoTable(doc,{html:"#pdf"});
    doc.save("productos");
  ;
}

  getAll() {
    this.productoService.getAll().subscribe(
      prod => {
        this.productos = prod
      }
    );
  }


  deleteProducto(id_producto?: number) {
    Swal.fire({
      title: 'Eliminar',
      text: 'Esta seguro de eliminar el Producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(id_producto).subscribe(
          (data) => {
            this.productos = this.productos?.filter((prod: any) => prod.id_producto != id_producto);
            Swal.fire('Exito', 'El Producto se elimino con exito!', 'success')
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar al Producto.', 'error')
          }
        );
      }
    })
  }

}
