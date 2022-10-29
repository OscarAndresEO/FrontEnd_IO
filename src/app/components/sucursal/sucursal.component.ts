import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/Service/sucursal.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/**
 * Librerias
 */
import Swal from 'sweetalert2';
import { Route } from '@angular/router';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  titulo: string = "Sucursales";

  sucursales?: Sucursal[];

  constructor(private sucursalService: SucursalService, public dialog: MatDialog, private router: Router,
    private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
    if  ((this.datosGlobales.logueado) &&(this.datosGlobales.rolLogueado === 'A ')) {
      this.sucursalService.getAll().subscribe(
        sucur => this.sucursales = sucur
      );
    } else {
      this.router.navigate(['/']);
    }

  }

  deleteSucursal(id_sucursal?: number) {
    Swal.fire({
      title: 'Eliminar',
      text: 'Esta seguro de eliminar la sucursal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id_sucursal);
        this.sucursalService.delete(id_sucursal).subscribe(

          (data) => {
            this.sucursales = this.sucursales?.filter((sucursal: any) => sucursal.id_sucursal != id_sucursal);
            Swal.fire('Exito', 'La sucursal se elimino con exito!', 'success')
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la sucursal.', 'error')
          }
        );
      }
    })
  }

}
