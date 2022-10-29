import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';

import { Ingreso } from '../models/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  //private url:string="http://localhost:8080/compras/";
  private url: string="https://inventarioio.herokuapp.com/compras/";
  constructor(private http:HttpClient) { }

  getAll():Observable<Ingreso[]>{
    return this.http.get<Ingreso[]>(this.url + "listar");
  }

  create(ingreso:any):Observable<any>{
    return this.http.post<any>(this.url+ "ingresoProducto/", ingreso);
  }

  get(id:number):Observable<Ingreso>{
    return this.http.get<Ingreso>(this.url + 'buscar/' + id);
  }

  update(ingreso:Ingreso):Observable<Ingreso>{
    return this.http.post<Ingreso>(this.url + 'actualizar/', ingreso);
  }

  delete(id_ingreso?:number){
      return this.http.get(this.url +'eliminar/' + id_ingreso);
  }
}
