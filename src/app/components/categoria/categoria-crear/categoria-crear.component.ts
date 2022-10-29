import { Component, OnInit } from '@angular/core';

import { CategoriaService } from 'src/app/Service/categoria.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Categoria } from 'src/app/models/categoria';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';

@Component({
  selector: 'app-categoria-crear',
  templateUrl: './categoria-crear.component.html',
  styleUrls: ['./categoria-crear.component.css']
})
export class CategoriaCrearComponent implements OnInit {

  titulo:string="Crear Categoria";

  constructor(private categoriaService:CategoriaService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private datosGlobales:DatosGlobalesService
    ) { }

    categoria:Categoria={
      id_categoria:0,
      descripcion_cat:''
    }

    ngOnInit(): void {
      if(this.datosGlobales.logueado){
      this.getCategoriasUpdate();
      }else{
        this.router.navigate(['/']);
      }     
    }
  
    getCategoriasUpdate():void{
      this.activatedRoute.params.subscribe(
        c=>{
          let id=c['id_categoria'];
          if(id){
            this.categoriaService.get(id).subscribe(
              cat=>this.categoria=cat
            )
          }
        }
      ) 
    }

crearCategoria(){
  this.categoria.usuario_creacion = this.datosGlobales.usernameLogueado;
      Swal.fire({
        title: 'Desea Guardar la Categoria?',
        text: 'Desea guardar la Categoria con los siguientes datos?' 
        + 'Nombre : ' + this.categoria.descripcion_cat
        ,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Guardar', 
        cancelButtonText: 'Cancelar',
      }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.create(this.categoria).subscribe(
          (data)=>{
            Swal.fire('Categoria Guardada','La Categoria ha sido guardado con éxito','success');
            this.router.navigate(['/categorias'])
          },(error) => {
            Swal.fire('Error','Error al guardar la Categoria','error');
          }
        )
      }
      })
}

updateCategoria(){
  this.categoria.usuario_modificacion = this.datosGlobales.usernameLogueado;
  Swal.fire({
    title: 'Desea Actualizar la Categoria?',
    text: 'Desea actualizar la Categoria con los siguientes datos?' 
    + 'Nombre Categoria: ' + this.categoria.descripcion_cat + ' , '
    ,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Guardar', 
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    console.log(this.categoria); 
  if (result.isConfirmed) {
    this.categoriaService.update(this.categoria).subscribe(
      (data)=>{
        Swal.fire('Categoria Actualizada','La Categoria ha sido actualizada con éxito','success');
        this.router.navigate(['/categorias'])
      },(error) => {
        Swal.fire('Error','Error al guardar la Categoria','error');
      }
    )
  }
  })
}


nombre = new FormControl('', [Validators.required, Validators.nullValidator,
  Validators.minLength(3),Validators.maxLength(64)]);

  public formularioCategoria = new FormGroup({
    nombre:this.nombre
  });

  getErrorNombreRequired() {
    if (this.nombre.hasError('required')) {
      return 'El campo es obligatorio';
    }
    return this.nombre.hasError('nombre') ? '' : '';
  } 

  getErrorNombreMin(){
    if (this.nombre.hasError('minlength')) {
      return 'El campo debe contener mas de 3 caracteres';
    }
    return this.nombre.hasError('nombre') ? '' : '';
  }

}
