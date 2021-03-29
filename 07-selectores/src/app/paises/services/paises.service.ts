import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';

import { Pais, PaisFull } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  
  private _baseUrl: string = 'https://restcountries.eu/rest/v2';
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<Pais[] | null> {
    if (!region)
      return of(null);
      
    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code;name`;
    return this.http.get<Pais[]>(url);
  }

  getPaisPorCodigo(codigo: string): Observable<PaisFull | null> {
    if (!codigo)
      return of(null);
      
    const url: string = `${this._baseUrl}/alpha/${codigo}`;
    return this.http.get<PaisFull>(url);
  }

  getPaisPorCodigoSmall(codigo: string): Observable<Pais> {
    const url: string = `${this._baseUrl}/alpha/${codigo}?fields=alpha3Code;name`;
    return this.http.get<PaisFull>(url);
  }

  getPaisesPorCodigos(codigos: string[]): Observable<Pais[]> {
    if (!codigos)
      return of([]);

    const peticiones: Observable<Pais>[]  = [];
    codigos.forEach(codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
