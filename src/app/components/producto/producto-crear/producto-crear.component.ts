import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/Service/producto.service';

import { MarcaService } from 'src/app/Service/marca.service';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { UsuarioService } from 'src/app/Service/usuario.service';
import { ProveedorService } from 'src/app/Service/proveedor.service';
import { Categoria } from 'src/app/models/categoria';
import { Usuario } from 'src/app/models/usuario';
import { Proveedor } from 'src/app/models/proveedor';
import { Marca } from 'src/app/models/marca';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent implements OnInit {

  titulo: string = 'Crear Moto';

  categorias?: Categoria[];
  usuarios?: Usuario[];
  proveedores?: Proveedor[];
  marcas?: Marca[];


  producto: Producto = {
    id_producto: 0,
    nombre_producto: '',
    id_marca: 0,
    linea: '',
    modelo: 0,
    cilindraje: 0,
    espec_tecnicas: '',
    existencias: 0,
    precio: 0,
    id_categoria: 0,
    id_usuario: 1,
    id_persona: 0
  }


  //producto:Producto=new Producto();

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private productoService: ProductoService,
    private categoriaService: CategoriaService, private usuarioService: UsuarioService,
    private proveedorService: ProveedorService,
    private marcaService: MarcaService,
    private datosGlobales: DatosGlobalesService) { }

  ngOnInit(): void {
    if (this.datosGlobales.logueado) {
      console.log(this.getCategorias())
      this.cargarDatosUpdate();
      this.getCategorias();
      this.getUsuarios();
      this.getProveedor();
      this.getMarcas();
    } else {
      this.router.navigate(['/']);
    }

  }

  getCategorias() {
    this.categoriaService.getAll().subscribe(
      cat => this.categorias = cat
    );
  }

  getUsuarios() {
    this.usuarioService.getAll().subscribe(
      us => this.usuarios = us
    );
  }

  getProveedor() {
    this.proveedorService.getAll().subscribe(
      pro => this.proveedores = pro
    );
  }

  getMarcas() {
    this.marcaService.getAll().subscribe(
      m => this.marcas = m
    );
  }


  cargarDatosUpdate(): void {
    this.activatedRoute.params.subscribe(
      s => {
        let id = s['id_producto'];
        if (id) {
          this.productoService.get(id).subscribe(
            us => this.producto = us
          )
        }
      }
    )
  }


  crearProducto() {
    this.producto.usuario_creacion = this.datosGlobales.usernameLogueado;
    Swal.fire({
      title: 'Desea Guardar el Producto?',  
      icon: 'question',text: 'Desea actualizar el Producto',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(this.producto);
      if (result.isConfirmed) {
        this.productoService.create(this.producto).subscribe(
          (data) => {
            Swal.fire('Producto guardado', 'El Producto ha sido guardado con éxito', 'success');
            this.router.navigate(['/productos'])
          }, (error) => {
            Swal.fire('Error', 'Error al guardar el Producto', 'error');
          }
        );
      }
    })
  }

  updateProducto() {
    this.producto.usuario_modificacion = this.datosGlobales.usernameLogueado;
    Swal.fire({
      title: 'Desea Actualizar el Producto?',
      text: 'Desea actualizar el Producto',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(this.producto);
      if (result.isConfirmed) {
        this.productoService.update(this.producto).subscribe(
          (data) => {
            Swal.fire('Producto Actualizado', 'El Producto ha sido actualizado con éxito', 'success');
            this.router.navigate(['/productos'])
          }, (error) => {
            Swal.fire('Error', 'Error al actualizar el Producto', 'error');
          }
        )
      }
    })
  }

  nombre_producto = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(3), Validators.maxLength(64)]);

  id_marca = new FormControl('', [Validators.required]);

  linea = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(2), Validators.maxLength(64)]);

  modelo = new FormControl('', [Validators.required, Validators.nullValidator]);

  cilindraje = new FormControl('', [Validators.required, Validators.nullValidator]);

  espec_tecnicas = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(10), Validators.maxLength(1000)]);

  //existencias = new FormControl('', [Validators.required, Validators.nullValidator]);

  precio = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(3), Validators.maxLength(7)]);

  id_categoria = new FormControl('', [Validators.required]);
  //id_usuario = new FormControl('',);
  id_persona = new FormControl('', [Validators.required]);

  public formularioProducto = new FormGroup({
    nombre_producto: this.nombre_producto,
    id_marca: this.id_marca,
    linea: this.linea,
    modelo: this.modelo,
    cilindraje: this.cilindraje,
    espec_tecnicas: this.espec_tecnicas,
    //existencias: this.existencias,
    precio: this.precio,
    id_categoria: this.id_categoria,
    //id_usuario: this.id_usuario,
    id_persona: this.id_persona
  });
  getErrorNombreRequired() {
    return this.getErrorRequired(this.nombre_producto);
  }

  getMarcaRequired() {
    return this.getErrorRequired(this.id_marca);
  }

  getLineaRequired() {
    return this.getErrorRequired(this.linea);
  }

  getModeloRequired() {
    return this.getErrorRequired(this.modelo);
  }
  getCilindrajeRequired() {
    return this.getErrorRequired(this.cilindraje);
  }
  getEspecTecRequired() {
    return this.getErrorRequired(this.espec_tecnicas);
  }

 /* getExistenciasRequired() {
    return this.getErrorRequired(this.existencias);
  }*/

  getPrecioRequired() {
    return this.getErrorRequired(this.precio);
  }
  getCategoriaRequired() {
    return this.getErrorRequired(this.id_categoria);
  }
  getPersonaRequired() {
    return this.getErrorRequired(this.id_persona);
  }
  /**Validacion de campos */

  getErrorRequired(campo: any) {
    if (campo.hasError('required')) {
      return 'El campo es obligatorio';
    }
    return campo.hasError('campo') ? '' : '';
  }

  getErrorNombreMin() {
    if (this.nombre_producto.hasError('minlength')) {
      return 'El campo debe tener almenos 3 caracteres';
    }
    return this.nombre_producto.hasError('campo') ? '' : '';
  }
  getErrorMinLinea() {
    if (this.linea.hasError('minlength')) {
      return 'El campo debe tener almenos 2 caracteres';
    }
    return this.linea.hasError('campo') ? '' : '';
  }

  getErrorMinPrecio() {
    if (this.precio.hasError('minlength')) {
      return 'El campo debe tener almenos 3 caracteres';
    }
    return this.precio.hasError('precio') ? '' : '';
  }

 /* getErrorMinExistencia() {
    if (this.existencias.hasError('minlength')) {
      return 'El campo debe tener almenos 3 caracteres';
    }
    return this.existencias.hasError('existencias') ? '' : '';
  }

  getMinLength() {
    if (this.existencias.value == '0') {
      return 'Mayor a 0';
    }
    return 'mayor a 0';
  } */

  getErrorMinEspecTec() {
    return this.getErrorMin(this.espec_tecnicas);
  }

  getErrorMin(campo: any) {
    if (campo.hasError('minlength')) {
      return 'El campo debe contener mas de 10 caracteres';
    }
    return campo.hasError('campo') ? '' : '';
  }
}
