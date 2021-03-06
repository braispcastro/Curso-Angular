import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'jzaRPxhBRviaD8i5QfE3VWMlvTpLYfLM';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse( localStorage.getItem( 'historial' )! ) || [];
    this.resultados = JSON.parse( localStorage.getItem( 'resultados' )! ) || [];

  }

  buscar( query: string = '' ): void {

    const parsedQuery = query.trim().toLocaleLowerCase();

    if (parsedQuery.length === 0) {
      return;
    }

    const idx = this._historial.indexOf( parsedQuery );
    if ( idx != -1 ) {
      this._historial.splice(idx, 1);
    }

    this._historial.unshift( parsedQuery );

    if (this._historial.length > 10) {
      this._historial.pop();
    }

    localStorage.setItem( 'historial', JSON.stringify( this._historial ) )

    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'limit', '12' )
      .set( 'q', parsedQuery );

    this.http.get<SearchGifsResponse>(`${ this.baseUrl }/search`, { params })
      .subscribe( ( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem( 'resultados', JSON.stringify( resp.data ) );
      }
    );

  }

}
