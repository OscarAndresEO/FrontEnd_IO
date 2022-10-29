import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  ventas?:any[];

  venta?:any={

  }
  //private url:string="https://investigacionio.herokuapp.com/sucursales/";
  private url:string="https://inventarioio.herokuapp.com/ventas/";
  //private url:string="http://localhost:8080/ventas/";
  constructor(private http:HttpClient) { }
  /**
   * 
   * Listar 
   */
  getAll():Observable<any[]>{
    return this.http.get<any[]>(this.url+"listar");
  }

  create(venta:any):Observable<any>{
    return this.http.post<any>(this.url + 'crearVenta/', venta);
  }

  get(id:number):Observable<any>{
    return this.http.get<any>(this.url + 'buscar/'+ id);
  }
  
}
