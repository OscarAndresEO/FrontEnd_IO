import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Modelo
 */

import { Sucursal } from '../models/sucursal';
@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  //private url:string="http://localhost:8080/sucursales/";
  private url:string="https://inventarioio.herokuapp.com/sucursales/";

  constructor(private http:HttpClient) { }
  /**
   * 
   * Listar 
   */
  getAll():Observable<Sucursal[]>{
    return this.http.get<Sucursal[]>(this.url+"listar");
  }

  create(sucursal:Sucursal):Observable<Sucursal>{
    return this.http.post<Sucursal>(this.url + 'crear/', sucursal);
  }

  get(id:number):Observable<Sucursal>{
    return this.http.get<Sucursal>(this.url + 'buscar/'+ id);
  }

  update(sucursal:any):Observable<Sucursal>{
    return this.http.post<Sucursal>(this.url + 'actualizar/' , sucursal);
  }

  delete(id_sucursal?:number){  //cambiar ruta
      return this.http.get('https://investigacionio.herokuapp.com/sucursales/eliminar/' + id_sucursal);
  }
}
