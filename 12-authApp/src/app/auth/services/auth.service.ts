import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';
import { catchError, map, tap } from "rxjs/operators";
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _user!: Usuario;

  get usuario() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) { }

  registro(name: string, email: string, password: string) {

    const url = `${this._baseUrl}/auth/new`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => this.updateLocalUser(resp)),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )

  }

  login (email: string, password: string) {
    const url = `${this._baseUrl}/auth`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => this.updateLocalUser(resp)),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  validarToken(): Observable<boolean> {
    const url = `${this._baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          this.updateLocalUser(resp);
          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  logout() {
    // localStorage.removeItem('token');
    localStorage.clear();
  }

  updateLocalUser(resp: AuthResponse) {
    localStorage.setItem('token', resp.token!);
    this._user = {
      name: resp.name!,
      email: resp.email!,
      uid: resp.uid!
    }
  }

}
