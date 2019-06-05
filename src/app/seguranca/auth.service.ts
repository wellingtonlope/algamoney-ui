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
  tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Observable<any> {
    const headers = {
      Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true}).pipe(
      map((item: any) => {
        this.armazenarToken(item.access_token);
        return item;
      })
    );
  }

  obterNovoAccessToken() {
    const headers = {
      Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = 'grant_type=refresh_token';
    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true})
      .pipe(
        map((item: any) => {
          this.armazenarToken(item.access_token);
          return item;
        })
      );
  }

  limparAccessToken() {
    return this.http.delete(this.tokensRevokeUrl, {withCredentials: true})
      .pipe(
        map(item => {
          localStorage.removeItem('access_token');
          this.jwtPayload = null;
          return item;
        })
      );
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('access_token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.armazenarToken(token);
    }
  }
}
