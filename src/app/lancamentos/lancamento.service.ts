import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

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

  atualizar(lancamento: Lancamento): Observable<any> {
    const headers = {
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-type': 'application/json'
    };
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
      JSON.stringify(lancamento), {headers}).pipe(
      map(item => {
        const lancamentoAlterado = item as Lancamento;
        this.converterStringsParaDatas([lancamentoAlterado]);
        return lancamentoAlterado;
      })
    );
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    const headers = {
      Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    };
    return this.http.get(`${this.lancamentosUrl}/${codigo}`, {headers}).pipe(
      map(item => {
        const lancamento = item as Lancamento;
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
      })
    );
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
