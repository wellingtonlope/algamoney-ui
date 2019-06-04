import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Observable<any> {
    const headers = {
      Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post(this.oauthTokenUrl, body, {headers}).pipe(
      map((item: any) => {
        this.armazenarToken(item.access_token);
        return item;
      })
    );
  }

  private armazenarToken(token: string) {
    const jwtHelperService: JwtHelperService = new JwtHelperService();
    this.jwtPayload = jwtHelperService.decodeToken(token);
    localStorage.setItem('access_token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.armazenarToken(token);
    }
  }
}
