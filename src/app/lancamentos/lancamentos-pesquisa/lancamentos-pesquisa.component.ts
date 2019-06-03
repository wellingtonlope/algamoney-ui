import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  filtro = new LancamentoFiltro();
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) {
  }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.lancamentoService.pesquisar(this.filtro)
      .subscribe((response: any) => {
        this.lancamentos = response.content;
      });
  }
}
