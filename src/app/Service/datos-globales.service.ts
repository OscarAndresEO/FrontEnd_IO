import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DatosGlobalesService {

  constructor() { }
  logueado : any = false;
  rolLogueado:any='';
  usernameLogueado:any='';
  idSucursalLogueado : any ='';
  id_usuario_logueado : any = '';
  
}
