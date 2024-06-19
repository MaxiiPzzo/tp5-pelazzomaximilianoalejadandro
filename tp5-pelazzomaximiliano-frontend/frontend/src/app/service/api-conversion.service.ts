import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiConversionService {
  constructor(
    private _http: HttpClient
  ) { }

  public getSimbolos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': '1bca15aa74msh855ac89a4a0bfe6p1efc72jsnf9261c2b28be',
        'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
        'content-type': 'application/json'
      })
    };
    return this._http.get("https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols", httpOptions)
  }

  public convertirMoneda(monedaOrigen:string,monedaDestino:string,cantidad:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key': '1bca15aa74msh855ac89a4a0bfe6p1efc72jsnf9261c2b28be',
        'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
        'content-type': 'application/json'
      })
    };
    return this._http.get(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${monedaOrigen}&to=${monedaDestino}&amount=${cantidad}`, httpOptions)
  }
}
