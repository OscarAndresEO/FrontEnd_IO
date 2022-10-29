import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';

import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //private url:string="http://localhost:8080/productos/";
  private url: string="https://inventarioio.herokuapp.com/productos/";
  constructor(private http:HttpClient) { }

  getAll():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url + "listar");
  }

  create(producto:any):Observable<Producto>{
    return this.http.post<Producto>(this.url+ "crear/", producto);
  }

  get(id:number):Observable<Producto>{
    return this.http.get<Producto>(this.url + 'buscar/' + id);
  }

  getProductosMenoresDeCinco():Observable<Producto>{
    return this.http.get<Producto>(this.url + 'requiereIngreso');
  }

  getByMarcaAndCatAndProved(id_marca:number,id_cat:number,id_proved:number):Observable<any>{
    return this.http.get(this.url + 'filtrarPorProveedor/' +id_proved+'/'+ id_marca+'/'+id_cat);
  }

  getByMarcaAndCat(id_marca:number,id_cat:number):Observable<any>{
    return this.http.get(this.url + 'filtrar/' + id_marca+'/'+id_cat);
    
  }

  update(producto:any):Observable<Producto>{
    return this.http.post<Producto>(this.url + 'actualizar/', producto);
  }

  delete(id_producto?:number){
      return this.http.get(this.url +'eliminar/' + id_producto);
  }

}
