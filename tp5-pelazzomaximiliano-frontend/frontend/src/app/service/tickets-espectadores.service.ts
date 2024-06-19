import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket, TicketConEspectador } from '../model/ticket';
import { Observable } from 'rxjs';
import { Espectador } from '../model/espectador';

@Injectable({
  providedIn: 'root'
})
export class TicketsEspectadoresService {
  constructor(
    private _http: HttpClient
  ) { }

  public getTickets(): Observable<TicketConEspectador[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.get<TicketConEspectador[]>("http://localhost:3000/api/ticket/", httpOptions)
  }

  public getTicketsByCategoriaTicket(idCategoria : string): Observable<TicketConEspectador[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.get<TicketConEspectador[]>(`http://localhost:3000/api/ticket/categoria/${idCategoria}`, httpOptions)
  }

  public getTicketByID(idTicket: string): Observable<Ticket> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.get<Ticket>(`http://localhost:3000/api/ticket/${idTicket}`, httpOptions)
  }

  public getTicketsByCategoria(categoria: string): Observable<TicketConEspectador[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.get<TicketConEspectador[]>(`http://localhost:3000/api/ticket/categoria?categoria=${categoria}`, httpOptions)
  }

  public getEspectadores(): Observable<Espectador[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.get<Espectador[]>("http://localhost:3000/api/espectador/", httpOptions)
  }

  public registrarTicket(nuevoTicket: Ticket): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    const body = nuevoTicket
    return this._http.post("http://localhost:3000/api/ticket/", body, httpOptions)
  }

  public modificarTicket(modificarTicket: Ticket, idTicket: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    const body = modificarTicket
    return this._http.put(`http://localhost:3000/api/ticket/${idTicket}`, body, httpOptions)
  }

  public borrarTicket(idTicket: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    return this._http.delete(`http://localhost:3000/api/ticket/${idTicket}`, httpOptions)
  }

}
