import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(
    private http: HttpClient
  ) {
  }

  login(usuario: string, senha: string): Observable<any> {
    const headers = {
      Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    return this.http.post(this.oauthTokenUrl, body, {headers});
  }
}
