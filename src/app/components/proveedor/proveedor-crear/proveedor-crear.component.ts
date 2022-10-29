import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';


import { ActivatedRoute, Router } from '@angular/router';


import Swal from 'sweetalert2';


import { Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/Service/proveedor.service';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';

@Component({
  selector: 'app-proveedor-crear',
  templateUrl: './proveedor-crear.component.html',
  styleUrls: ['./proveedor-crear.component.css']
})
export class ProveedorCrearComponent implements OnInit {

  titulo: string = "Crear Proveedor";

  proveedor: Proveedor = {
    id_persona: 0,
    tipo_persona: 'P',
    nombre_persona: '',
    nit: '',
    direccion: '',
    celular: '',
    telefono_fijo: '',
    pagina_web: ''
    // usuario_creacion:'', 
    //usuario_modificacion:''
  }
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private proveedorService: ProveedorService,
    private datosGlobales: DatosGlobalesService

  ) { }

  ngOnInit(): void {
    if (this.datosGlobales.logueado) {
      this.cargarDatosUpdate();
    } else {
      this.router.navigate(['/']);
    }

  }

  cargarDatosUpdate(): void {
    this.activatedRoute.params.subscribe(
      s => {
        let id = s['id_persona'];
        if (id) {
          this.proveedorService.get(id).subscribe(
            us => this.proveedor = us
          )
        }
      }
    )
  }


  crearProveedor() {
    this.proveedor.usuario_creacion = this.datosGlobales.usernameLogueado;
    Swal.fire({
      title: 'Desea Guardar el Proveedor?',
      text: 'Desea guardar el Proveedor con los siguientes datos?'
        + 'Nombre : ' + this.proveedor.nombre_persona + ' , '
        + 'Direccion : ' + this.proveedor.direccion + ' , '
        + 'Email :' + this.proveedor.nit + ' , '
        + 'Celular :' + this.proveedor.celular
        + 'Linea Fija :' + this.proveedor.telefono_fijo
        + 'Pagina web :' + this.proveedor.pagina_web
      ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(this.proveedor);
      if (result.isConfirmed) {
        this.proveedorService.create(this.proveedor).subscribe(
          (data) => {
            Swal.fire('Proveedor guardado', 'El Proveedor ha sido guardado con éxito', 'success');
            this.router.navigate(['/proveedores'])
          }, (error) => {
            Swal.fire('Error', 'Error al guardar el Proveedor', 'error');
          }
        )
      }
    })
  }

  updateProveedor() {
    this.proveedor.usuario_modificacion = this.datosGlobales.usernameLogueado;
    Swal.fire({
      title: 'Desea Guardar el Proveedor?',
      text: 'Desea guardar el Proveedor con los siguientes datos?'
        + 'Nombre : ' + this.proveedor.nombre_persona + ' , '
        + 'Direccion : ' + this.proveedor.direccion + ' , '
        + 'Email :' + this.proveedor.nit + ' , '
        + 'Celular :' + this.proveedor.celular
        + 'Linea Fija :' + this.proveedor.telefono_fijo
        + 'Pagina web :' + this.proveedor.pagina_web
      ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      //console.log(this.usuario); 
      if (result.isConfirmed) {
        this.proveedorService.create(this.proveedor).subscribe(
          (data) => {
            Swal.fire('Proveedor guardado', 'El Proveedor ha sido actualizado con éxito', 'success');
            this.router.navigate(['/proveedores'])
          }, (error) => {
            Swal.fire('Error', 'Error al actualizar el Proveedor', 'error');
          }
        )
      }
    })
  }

  nombre = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(10), Validators.maxLength(64)]);

  nit = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(5), Validators.maxLength(11)]);

  direccion = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(10), Validators.maxLength(64)]);


  celular = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(8), Validators.maxLength(8)]);

  telefono_fijo = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(8), Validators.maxLength(8)]);

  pagina_web = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(5), Validators.maxLength(64)]);

  public formularioProveedor = new FormGroup({
    nombre: this.nombre,
    nit: this.nit,
    direccion: this.direccion,
    celular: this.celular,
    telefono_fijo: this.telefono_fijo,
    pagina_web: this.pagina_web
  });


  getErrorNombreRequired() {
    return this.getErrorRequired(this.nombre);
  }

  getErrorNombreMin() {
    return this.getErrorMin(this.nombre);
  }

  getErrorEmailRequired() {
    return this.getErrorRequired(this.nit);
  }

  getErrorEmailMin() {
    return this.getErrorMin(this.nit);
  }

  getErrorDireccionRequired() {
    return this.getErrorRequired(this.direccion);
  }

  getErrorDireccionMin() {
    return this.getErrorMin(this.direccion);
  }

  getErrorCuiRequired() {
    return this.getErrorRequired(this.celular);
  }

  getErrorCuiMin() {
    return this.getErrorMin(this.celular);
  }

  getErrorUsernameRequired() {
    return this.getErrorRequired(this.telefono_fijo);
  }

  getErrorUsernameMin() {
    return this.getErrorMin(this.telefono_fijo);
  }


  getErrorClaveRequired() {
    return this.getErrorRequired(this.pagina_web);
  }

  getErrorClaveMin() {
    return this.getErrorMin(this.pagina_web);
  }

  /**Validacion de campos */
  getErrorMin(campo: any) {
    if (campo.hasError('minlength')) {
      return 'El campo debe contener mas de 10 caracteres';
    }
    return campo.hasError('campo') ? '' : '';
  }

  getErrorRequired(campo: any) {
    if (campo.hasError('required')) {
      return 'El campo es obligatorio';
    }
    return campo.hasError('campo') ? '' : '';
  }

}
