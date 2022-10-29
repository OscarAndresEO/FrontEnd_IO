import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/Service/cliente.service';
import { DatosGlobalesService } from 'src/app/Service/datos-globales.service';

@Component({
  selector: 'app-cliente-crear',
  templateUrl: './cliente-crear.component.html',
  styleUrls: ['./cliente-crear.component.css']
})
export class ClienteCrearComponent implements OnInit {

  titulo:string="Crear Cliente";

  cliente:Cliente={
    id_persona:0,
    tipo_persona:'C',
    nombre_persona:'',
    nit:'',
    direccion:'',
    celular:'',
    telefono_fijo: '',
    //pagina_web:''
   // usuario_creacion:'', 
    //usuario_modificacion:''
  }

  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,
    private clienteService:ClienteService,
    private datosGlobales:DatosGlobalesService) { }

  ngOnInit(): void {  if(this.datosGlobales.logueado){
    this.cargarDatosUpdate();
  }else{
    this.router.navigate(['/']);
  }
    
  }

  cargarDatosUpdate():void{
    this.activatedRoute.params.subscribe(
      c=>{
        let id=c['id_persona'];
        if(id){
          this.clienteService.get(id).subscribe(
            cl=>this.cliente=cl
          )
        }
      }
    ) 
  }

  crearCliente(){
    this.cliente.usuario_creacion = this.datosGlobales.usernameLogueado;
    Swal.fire({
      title: 'Desea Guardar el Cliente?',
      text: 'Desea guardar el Cliente con los siguientes datos?' 
      + 'Nombre : ' + this.cliente.nombre_persona + ' , '
      + 'Direccion : ' + this.cliente.direccion + ' , '
      + 'Email :' + this.cliente.nit + ' , '
      + 'Celular :' + this.cliente.celular
      + 'Linea Fija :' + this.cliente.telefono_fijo
      ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar', 
      cancelButtonText: 'Cancelar',
    }).then((result) => {
    if (result.isConfirmed) {
      this.clienteService.create(this.cliente).subscribe(
        (data)=>{
          Swal.fire('Cliente guardado','El Cliente ha sido guardado con éxito','success');
          this.router.navigate(['/clientes']);
        },(error) => {
          Swal.fire('Error','Error al guardar el Cliente','error');
        }
      )
    }
    })
  }

  updateCliente(){
    this.cliente.usuario_modificacion = this.datosGlobales.usernameLogueado;
    Swal.fire({
      title: 'Desea Guardar el Cliente?',
      text: 'Desea guardar el Cliente con los siguientes datos?' 
      + 'Nombre : ' + this.cliente.nombre_persona + ' , '
      + 'Direccion : ' + this.cliente.direccion + ' , '
      + 'Email :' + this.cliente.nit + ' , '
      + 'Celular :' + this.cliente.celular
      + 'Linea Fija :' + this.cliente.telefono_fijo
      ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar', 
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      //console.log(this.usuario); 
      if (result.isConfirmed) {
        this.clienteService.create(this.cliente).subscribe(
          (data)=>{
            Swal.fire('Cliente guardado','El Cliente ha sido guardado con éxito','success');
            this.router.navigate(['/clientes'])
          },(error) => {
            Swal.fire('Error','Error al guardar el Cliente','error');
          }
        )
      }
    })
  }

  nombre_persona = new FormControl('', [Validators.required, Validators.nullValidator,
    Validators.minLength(10),Validators.maxLength(64)]);

  nit = new FormControl('', [Validators.required, Validators.nullValidator,
    Validators.minLength(5),Validators.maxLength(11)]);

  direccion = new FormControl('', [Validators.required, Validators.nullValidator,
    Validators.minLength(10),Validators.maxLength(64)]);


  celular = new FormControl('', [Validators.required, Validators.nullValidator,
    Validators.minLength(8),Validators.maxLength(8)]);

  telefono_fijo = new FormControl('', [Validators.minLength(8),Validators.maxLength(8)]);

    public formularioCliente = new FormGroup({
      nombre_persona:this.nombre_persona,
      nit:this.nit,
      direccion:this.direccion,
      celular:this.celular,
      telefono_fijo:this.telefono_fijo
    });


    getErrorNombreRequired() {
      return this.getErrorRequired(this.nombre_persona);
    } 
  
    getErrorNombreMin(){
      return this.getErrorMin(this.nombre_persona);
    }
  
    getErrorEmailRequired(){
      return this.getErrorRequired(this.nit);
    }
  
    getErrorEmailMin(){
      return this.getErrorMin(this.nit);
    }

    getErrorDireccionRequired(){
      return this.getErrorRequired(this.direccion);
    }
  
    getErrorDireccionMin(){
      return this.getErrorMin(this.direccion);
    }
    
    getErrorCuiRequired(){
      return this.getErrorRequired(this.celular);
    }
  
    getErrorCuiMin(){
      return this.getErrorMin(this.celular);
    }
  
    getErrorUsernameRequired() {
      return this.getErrorRequired(this.telefono_fijo);
    } 
  
    getErrorUsernameMin(){
      return this.getErrorMin(this.telefono_fijo);
    }

    getErrorMin(campo:any) {
      if (campo.hasError('minlength')) {
        return 'El campo debe contener mas de 10 caracteres';
      }
      return campo.hasError('campo') ? '' : '';
    } 
  
    getErrorRequired(campo:any){
      if (campo.hasError('required')) {
        return 'El campo es obligatorio';
      }
      return campo.hasError('campo') ? '' : '';
    }
}
