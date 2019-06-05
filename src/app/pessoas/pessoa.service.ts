import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Pessoa } from '../core/model';
import { environment } from '../../environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    const params = {
      nome: filtro.nome || '',
      page: filtro.pagina.toString(),
      size: filtro.itensPorPagina.toString()
    };

    return this.http.get(this.pessoasUrl, {params});
  }

  listarTodas(): Observable<any> {
    return this.http.get(this.pessoasUrl);
  }

  excluir(codigo: number): Observable<any> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`);
  }

  mudarStatus(codigo: number, ativo: boolean): Observable<any> {
    const headers = {
      'Content-Type': 'application/json'
    };
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers});
  }

  adicionar(pessoa: Pessoa): Observable<any> {
    const headers = {
      'Content-type': 'application/json'
    };
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), {headers});
  }

  atualizar(pessoa: Pessoa): Observable<any> {
    const headers = {
      'Content-type': 'application/json'
    };
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), {headers});
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`);
  }
}
