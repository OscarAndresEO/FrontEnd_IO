import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/Service/usuario.service';

import { ActivatedRoute, Router } from '@angular/router';

import { FormControl, Validators, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';
import { Rol } from 'src/app/models/rol';
import { Sucursal } from 'src/app/models/sucursal';
import { SucursalService } from 'src/app/Service/sucursal.service';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
export class UsuarioCrearComponent implements OnInit {
  // usuario:Usuario=new Usuario();
  usuario: Usuario = {
    id_usuario: 0,
    nombre_usuario: '',
    direccion: '',
    email: '',
    cui: '',
    username: '',
    clave: '',
    rol: '',
    id_sucursal: 0,
    nombre_sucursal: ''
  }

  roles?: Rol[];
  sucursales?: Sucursal[];

  titulo: string = 'Crear Usuario';

  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private sucursalService: SucursalService,
    private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
    if  ((this.datosGlobales.logueado) &&(this.datosGlobales.rolLogueado === 'A '))  {
      this.getRoles();
      this.getSucursales();
      this.cargarDatosUpdate();
    } else {
      this.router.navigate(['/']);
    }

  }

  cargarDatosUpdate(): void {
    this.activatedRoute.params.subscribe(
      s => {
        let id = s['id_usuario'];
        if (id) {
          this.usuarioService.get(id).subscribe(
            us => this.usuario = us
          )
        }
      }
    )
  }

  crearUsuario() {
    Swal.fire({
      title: 'Desea Guardar el Usuario?',
      text: 'Desea guardar el Usuario con los siguientes datos?'
        + 'Nombre : ' + this.usuario.nombre_usuario + ' , '
        + 'Direccion : ' + this.usuario.direccion + ' , '
        + 'Email :' + this.usuario.email + ' , '
        + 'Nombre :' + this.usuario.rol
      ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(this.usuario);
      if (result.isConfirmed) {
        this.usuarioService.create(this.usuario).subscribe(
          (data) => {
            Swal.fire('Usuario guardado', 'El Usuario ha sido guardado con éxito', 'success');
            this.router.navigate(['/usuarios'])
          }, (error) => {
            Swal.fire('Error', 'Error al guardar el Usuario', 'error');
          }
        )
      }
    })
  }

  updateUsuario() {
    Swal.fire({
      title: 'Desea Actualizar el Usuario?',
      text: 'Desea actualizar el Usuario con los siguientes datos?'
        + 'Nombre : ' + this.usuario.nombre_usuario + ' , '
        + 'Direccion : ' + this.usuario.direccion + ' , '
        + 'Email :' + this.usuario.email + ' , '
        + 'Rol : ' + this.usuario.rol
        + 'Sucursal : ' + this.usuario.nombre_sucursal
      ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(this.usuario);
      if (result.isConfirmed) {
        this.usuarioService.update(this.usuario).subscribe(
          (data) => {
            Swal.fire('Usuario guardado', 'El Usuario ha sido guardado con éxito', 'success');
            this.router.navigate(['/usuarios'])
          }, (error) => {
            Swal.fire('Error', 'Error al guardar el Usuario', 'error');
          }
        )
      }
    })
  }

  getRoles() {
    this.usuarioService.getRoles().subscribe(
      rol => this.roles = rol
    );
  }

  getSucursales() {
    this.sucursalService.getAll().subscribe(
      sucur => this.sucursales = sucur
    );
  }

  nombre_usuario = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(10), Validators.maxLength(64)]);

  direccion = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(10), Validators.maxLength(64)]);

  email = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(10), Validators.maxLength(64)]);

  cui = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(13), Validators.maxLength(13)]);

  username = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(5), Validators.maxLength(16)]);

  clave = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(8), Validators.maxLength(16)]);

  rol = new FormControl('', Validators.required);

  id_sucursal = new FormControl('', Validators.required);


  public formulario = new FormGroup({
    nombre_usuario: this.nombre_usuario,
    direccion: this.direccion,
    email: this.email,
    cui: this.cui,
    username: this.username,
    clave: this.clave,
    rol: this.rol,
    id_sucursal: this.id_sucursal
  });

  getErrorNombreRequired() {
    return this.getErrorRequired(this.nombre_usuario);
  }

  getErrorNombreMin() {
    return this.getErrorMin(this.nombre_usuario);
  }

  getErrorDireccionRequired() {
    return this.getErrorRequired(this.direccion);
  }

  getErrorDireccionMin() {
    return this.getErrorMin(this.direccion);
  }

  getErrorEmailRequired() {
    return this.getErrorRequired(this.email);
  }

  getErrorEmailMin() {
    return this.getErrorMin(this.email);
  }

  getErrorCuiRequired() {
    return this.getErrorRequired(this.cui);
  }

  getErrorCuiMin() {
    return this.getErrorMin(this.cui);
  }

  getErrorUsernameRequired() {
    return this.getErrorRequired(this.username);
  }

  getErrorUsernameMin() {
    return this.getErrorMin(this.username);
  }


  getErrorClaveRequired() {
    return this.getErrorRequired(this.clave);
  }

  getErrorClaveMin() {
    return this.getErrorMin(this.clave);
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
