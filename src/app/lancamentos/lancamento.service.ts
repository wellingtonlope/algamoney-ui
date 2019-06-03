import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
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

    const dataInicio = filtro.dataVencimentoInicio ? moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD') : '';
    const dataFim = filtro.dataVencimentoFim ? moment(filtro.dataVencimentoFim).format('YYYY-MM-DD') : '';
    params = {
      descricao: filtro.descricao || '',
      dataVencimentoDe: dataInicio,
      dataVencimentoAte: dataFim
    };

    return this.http.get(`${this.lancamentosUrl}?resumo`, {headers, params});
  }
}
