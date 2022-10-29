import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //private url:string="http://localhost:8080/clientes/";
  private url:string="https://inventarioio.herokuapp.com/clientes/";
  constructor(private http:HttpClient) { }

  getAll():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url + "listar");
  }

  create(cliente:any):Observable<Cliente>{
    return this.http.post<Cliente>(this.url+ "crear/", cliente);
  }

  get(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(this.url + 'buscar/' + id);
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url + 'actualizar/', cliente);
  }

  delete(id_cliente?:number){
      return this.http.get(this.url +'eliminar/' + id_cliente);
  }


}
