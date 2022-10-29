import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Observable} from 'rxjs';

import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  // private url:string="http://localhost:8080/categorias/";
 private url:string="https://inventarioio.herokuapp.com/categorias/";
  constructor(private http:HttpClient) { }

  getAll():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.url + "listar");
  }

  get(id:number):Observable<Categoria>{
    return this.http.get<Categoria>(this.url + 'buscar/' + id)
  }

  create(categoria:Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(this.url + 'crear/', categoria)
  }

  update(categoria:any):Observable<Categoria>{
    return this.http.post<Categoria>(this.url + 'actualizar/', categoria)
  }

  delete(id_categoria?:number){
    return this.http.get(this.url + 'eliminar/'+ id_categoria) 
  }

}
