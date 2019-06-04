import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Pessoa } from '../core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {
  }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    const headers = {Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='};

    const params = {
      nome: filtro.nome || '',
      page: filtro.pagina.toString(),
      size: filtro.itensPorPagina.toString()
    };

    return this.http.get(this.pessoasUrl, {headers, params});
  }

  listarTodas(): Observable<any> {
    const headers = {Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='};

    return this.http.get(this.pessoasUrl, {headers});
  }

  excluir(codigo: number): Observable<any> {
    const headers = {Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='};
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers});
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<any> {
    const headers = {
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    };
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers});
  }

  adicionar(pessoa: Pessoa): Observable<any> {
    const headers = {
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-type': 'application/json'
    };
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), {headers});
  }

  atualizar(pessoa: Pessoa): Observable<any> {
    const headers = {
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-type': 'application/json'
    };
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), {headers});
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    const headers = {
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    };
    return this.http.get(`${this.pessoasUrl}/${codigo}`, {headers});
  }
}
