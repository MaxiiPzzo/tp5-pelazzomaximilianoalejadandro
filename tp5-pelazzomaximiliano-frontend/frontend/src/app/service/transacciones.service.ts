import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaccion } from '../model/transacciones';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(
    private _http: HttpClient
  ) { }

  public crearNuevaTransaccion(nuevaTransaccion: Transaccion): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    const body = nuevaTransaccion
    return this._http.post(`http://localhost:3000/api/transaccion/`, body, httpOptions)
  }

  public getTransacciones(): Observable<Transaccion[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this._http.get<Transaccion[]>(`http://localhost:3000/api/transaccion/`, httpOptions)
  }
  public getTransaccionesFiltradas(monedaOrigen: string, monedaDestino: string): Observable<Transaccion[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    }
    return this._http.get<Transaccion[]>(`http://localhost:3000/api/transaccion/divisas?origen=${monedaOrigen}&destino=${monedaDestino}`, httpOptions)
  }

}
