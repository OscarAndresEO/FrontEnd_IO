import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/Service/marca.service';
import Swal from 'sweetalert2';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Marca } from 'src/app/models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';
@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent implements OnInit {

  titulo:string="Crear Marca";
  tituloUpdate:string="Actualizar Marca"
  constructor(private marcaSerice:MarcaService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              private datosGlobales:DatosGlobalesService) { }
  
  marca:Marca={
    id_marca:0,
    descripcion:''
  }

  ngOnInit(): void {  if(this.datosGlobales.logueado){
     this.getMarcasUpdate();
  }else{
    this.router.navigate(['/']);
  }
   
  }

  getMarcasUpdate():void{
    this.activatedRoute.params.subscribe(
      m=>{
        let id=m['id_marca'];
        if(id){
          this.marcaSerice.get(id).subscribe(
            ma=>this.marca=ma
          )
        }
      }
    ) 
  }


crearMarca(){
  this.marca.usuario_creacion = this.datosGlobales.usernameLogueado;
    Swal.fire({
      title: 'Desea Guardar la Marca?',
      text: 'Desea guardar la marca con los siguientes datos?' 
      + 'Nombre : ' + this.marca.descripcion
      ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar', 
      cancelButtonText: 'Cancelar',
    }).then((result) => {
    if (result.isConfirmed) {
      this.marcaSerice.create(this.marca).subscribe(
        (data)=>{
          Swal.fire('Marca Guardada','La Marca ha sido guardado con éxito','success');
          this.router.navigate(['/marcas'])
        },(error) => {
          Swal.fire('Error','Error al guardar la Marca','error');
        }
      )
    }
    })
  }

updateMarca(){
  this.marca.usuario_modificacion = this.datosGlobales.usernameLogueado;
    Swal.fire({
      title: 'Desea Actualizar la Marca?',
      text: 'Desea actualizar la Marca con los siguientes datos?' 
      + 'Nombre : ' + this.marca.descripcion + ' , '
      ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar', 
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      console.log(this.marca); 
    if (result.isConfirmed) {
      this.marcaSerice.update(this.marca).subscribe(
        (data)=>{
          Swal.fire('Marca Actualizada','La Marca ha sido actualizada con éxito','success');
          this.router.navigate(['/marcas'])
        },(error) => {
          Swal.fire('Error','Error al guardar la Marca','error');
        }
      )
    }
    })
  }

  nombre = new FormControl('', [Validators.required, Validators.nullValidator,
    Validators.minLength(3),Validators.maxLength(64)]);

    public formularioMarca = new FormGroup({
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
