import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../model/productos.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(
    private _http : HttpClient
  ) { }

  public getProductos() : Observable<Producto[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.get<Producto[]>("http://localhost:3000/api/producto/",httpOptions)
  }

  public getProductosDestacados() : Observable<Producto[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.get<Producto[]>("http://localhost:3000/api/producto/destacados",httpOptions)
  }

  public deleteProducto(id : string) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.delete(`http://localhost:3000/api/producto/${id}`,httpOptions)
  }

  public createProducto(nuevoProducto : object) : Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    const body = nuevoProducto
    return this._http.post(`http://localhost:3000/api/producto/`,body,httpOptions)
  }

  public modificarProducto(productoModificado : Producto) : Observable<any>{
    const idModificar = productoModificado._id
    delete productoModificado._id
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    const body = productoModificado
    return this._http.put(`http://localhost:3000/api/producto/${idModificar}`,body,httpOptions)
  }
}
