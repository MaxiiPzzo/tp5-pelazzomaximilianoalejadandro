import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private _http :HttpClient
  ) { }

  public getCategorias() : Observable<Categoria[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.get<Categoria[]>("http://localhost:3000/api/categoria/",httpOptions)
  }
}
