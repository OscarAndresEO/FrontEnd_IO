import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Modelo
 */
import { Usuario } from '../models/usuario';
import { Rol } from '../models/rol';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //private url:string="http://localhost:8080/usuarios/";
  private url:string="https://inventarioio.herokuapp.com/usuarios/";

  constructor(private  http:HttpClient) { }
  /**Este metodo funciona pero NO CON DTO XD solo usalo porque ya jala jaja */
  iniciarSesion(username:any,clave : any){
    console.log(this.url+'login/'+username+'/'+clave)
      return this.http.get(this.url+'login/'+username+'/'+clave);
  }

  getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url + "listar");
  }

  create(usuario:any):Observable<Usuario>{
    return this.http.post<Usuario>(this.url+ "crear/", usuario);
  }

  get(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.url + 'buscar/' +id)
  }

  update(usuario:any):Observable<Usuario>{
    return this.http.post<Usuario>(this.url + 'actualizar/', usuario)
  }

  getRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(this.url + "catalogos")
  }

  delete(id_usuario?:number){
      return this.http.get(this.url +'eliminar/' + id_usuario)
  }
}
