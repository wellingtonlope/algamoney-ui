import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) {
  }

  ngOnInit(): void {
    // this.pesquisar();
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .subscribe((response: any) => {
        this.lancamentos = response.content;
        this.totalRegistros = response.totalElements;
      });
  }
}
