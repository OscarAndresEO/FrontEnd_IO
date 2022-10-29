import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';


import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  //private url:string="http://localhost:8080/proveedores/";
  private url:string="https://inventarioio.herokuapp.com/proveedores/";

  constructor(private http:HttpClient) { }

  getAll():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(this.url + "listar");
  }

  create(proveedor:any):Observable<any>{
    return this.http.post(this.url+ "crear/", proveedor);
  }

  get(id:any):Observable<Proveedor>{
    return this.http.get<Proveedor>(this.url + 'buscar/' + id);
  }

  update(proveedor:Proveedor):Observable<Proveedor>{
    return this.http.post<Proveedor>(this.url + 'actualizar/', proveedor);
  }

  delete(id_proveedor?:number){
      return this.http.get(this.url +'eliminar/' + id_proveedor);
  }


}
