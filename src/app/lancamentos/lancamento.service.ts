import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {
  }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    const headers = {Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='};

    const dataInicio = filtro.dataVencimentoInicio ? moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD') : '';
    const dataFim = filtro.dataVencimentoFim ? moment(filtro.dataVencimentoFim).format('YYYY-MM-DD') : '';
    const params = {
      descricao: filtro.descricao || '',
      dataVencimentoDe: dataInicio,
      dataVencimentoAte: dataFim,
      page: filtro.pagina.toString(),
      size: filtro.itensPorPagina.toString()
    };

    return this.http.get(`${this.lancamentosUrl}?resumo`, {headers, params});
  }

  excluir(codigo: number): Observable<any> {
    const headers = {Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='};
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, {headers});
  }

  adicionar(lancamento: Lancamento): Observable<any> {
    const headers = {
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-type': 'application/json'
    };
    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), {headers});
  }
}
