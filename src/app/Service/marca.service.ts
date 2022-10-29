import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

import { Marca } from '../models/marca';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  //private url:string="http://localhost:8080/marcas/";
  private url:string="https://inventarioio.herokuapp.com/marcas/";
  constructor(private http:HttpClient) { }

  getAll():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.url + "listar");
  }

  get(id:number):Observable<Marca>{
    return this.http.get<Marca>(this.url + 'buscar/' + id)
  }

  create(marca:Marca):Observable<Marca>{
    return this.http.post<Marca>(this.url + 'crear/', marca)
  }

  update(marca:Marca):Observable<Marca>{
    return this.http.post<Marca>(this.url + 'actualizar/', marca)
  }

  delete(id_marca?:number){
    return this.http.get(this.url + 'eliminar/'+ id_marca) 
  }
}
