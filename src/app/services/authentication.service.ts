import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Jwtres } from '../models/jwtres';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUri = '/api';
  authSubject = new BehaviorSubject(false);
  private token: string | null = '';
  private currentUser: string | null = null;
  private tipoUsuario: string | null = null;
  private usuarioId: string | null = null;

  constructor(private httpClient: HttpClient) {}

  register(user: User): Observable<Jwtres> {
    return this.httpClient.post<Jwtres>(this.apiUri + '/signup', user);
  }

  login(user: User): Observable<Jwtres> {
    return this.httpClient.post<Jwtres>(this.apiUri + '/login', user).pipe(
      tap((res: Jwtres) => {
        if (res) {
          {
            localStorage.setItem('CURRENT_USER', res.datosUsuario.usuario);
            localStorage.setItem('TIPO_DE_USUARIO', res.datosUsuario.tipo_de_usuario);
            localStorage.setItem('ACCESS_TOKEN', res.datosUsuario.accessToken);
            localStorage.setItem('USUARIO_ID', res.datosUsuario.id);
            // console.log(JSON.parse(JSON.stringify(res)).accessToken)
            //ACCESS_TOKEN: JSON.parse(JSON.stringify(res)).accessToken
          }
        } else {
          console.log('hubo un error');
        }
      })
    );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
  }

  private saveToken(token: string, expiresIn: string) {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', token);
    this.token = token;
  }

  private getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }
  getCurrentUser(): string | null {
    if (!this.currentUser) {
      this.currentUser = localStorage.getItem('CURRENT_USER');
      
    }
    return this.currentUser;
  }
  getTipoUsuario(): string | null {
    if (!this.tipoUsuario) {
      this.tipoUsuario = localStorage.getItem('TIPO_DE_USUARIO');

    }
    return this.tipoUsuario;
  }

  getUsuarioId(): string | null {
    if (!this.usuarioId) {
      this.usuarioId = localStorage.getItem('USUARIO_ID');

    }
    return this.usuarioId;
  }
}
