import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {
  }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = {};
    const headers = {Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='};

    if (filtro.descricao) {
      params = {descricao: filtro.descricao};
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, {headers, params});
  }
}
