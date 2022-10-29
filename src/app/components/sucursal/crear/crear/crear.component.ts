import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/Service/sucursal.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormControl, Validators, FormGroup } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import Swal from 'sweetalert2';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {


  sucursal: Sucursal = new Sucursal();

  titulo: string = "Crear Sucursal";

  constructor(public dialog: MatDialog,
    private sucursalService: SucursalService,
    private router: Router, public swal: SweetAlert2Module,
    private activatedRoute: ActivatedRoute,
    private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
    if  ((this.datosGlobales.logueado) &&(this.datosGlobales.rolLogueado === 'A '))  {
      this.cargar();
    } else {
      this.router.navigate(['/']);
    }

  }

  cargar(): void {

    this.activatedRoute.params.subscribe(
      s => {
        let id = s['id_sucursal'];
        if (id) {
          this.sucursalService.get(id).subscribe(
            sucu => this.sucursal = sucu
          );
        }
      }
    );
  }


  validacionesForm() {
    Swal.fire({
      title: 'Desea Guardar la Sucursal?',
      text: 'Desea guardar la sucursal con los siguientes datos?'
        + this.sucursal.nombre_sucursal + ' , '
        + this.sucursal.direccion_sucursal + ' , '
        + this.sucursal.ubicacion_sucursal + ' , '
      ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sucursalService.create(this.sucursal).subscribe(
          (data) => {
            Swal.fire('Sucursal Guardada', 'La Sucursal ha sido guardado con éxito', 'success');
            this.router.navigate(['/sucursales'])
          }, (error) => {
            Swal.fire('Error', 'Error al guardar la Sucursal', 'error');
          }
        )
      }
    })
  }

  validacionesFormUpdate() {

    if (this.sucursal.nombre_sucursal?.trim() == '' || this.sucursal.nombre_sucursal == null) {
      //this.getErrorMessage
    } else {

      Swal.fire({
        title: 'Desea Actualizar la Sucursal?',
        text: 'Desea Actualizar la sucursal con los siguientes datos?'
          + this.sucursal.nombre_sucursal + ' , '
          + this.sucursal.direccion_sucursal + ' , '
          + this.sucursal.ubicacion_sucursal + ' , '
        ,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        this.sucursalService.update(this.sucursal).subscribe();
        if (result.value) {
          Swal.fire({
            title: 'Exito',
            text: 'La sucursal se actualizó con exito',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            this.router.navigate(['/sucursales'])
          })
        }
      })
    }
  }

  public nombre = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(10), Validators.maxLength(64)]);
  public direccion = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(10), Validators.maxLength(64)]);
  public ubicacion = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(10), Validators.maxLength(64)]);

  public formularioSucursal = new FormGroup({
    nombre: this.nombre,
    direccion: this.direccion,
    ubicacion: this.ubicacion
  });

  getErrorMessageNombre() {
    if (this.nombre.hasError('required')) {
      return 'El campo es obligatorio';
    } else if (this.nombre.hasError('minLength')) {
      return 'La longitud debe ser mayor a 10 caracteres';
    }

    return this.nombre.hasError('nombre') ? 'Not a valid email' : '';
  }

  getErrorMessageDireccion() {
    if (this.direccion.hasError('required')) {
      return 'El campo es obligatorio';
    } else if (this.direccion.hasError('minLength')) {
      return 'La longitud debe ser mayor a 10 caracteres';
    }

    return this.direccion.hasError('direccion') ? 'Not a valid email' : '';
  }

  getErrorMessageUbicacion() {
    if (this.ubicacion.hasError('required')) {
      return 'El campo es obligatorio';
    } else if (this.ubicacion.hasError('minLength')) {
      return 'La longitud debe ser mayor a 10 caracteres';
    }

    return this.ubicacion.hasError('ubicacion') ? 'Not a valid email' : '';
  }

}
