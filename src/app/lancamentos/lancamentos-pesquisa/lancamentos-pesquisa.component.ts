import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from "../../core/error-handler.service";

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') tabela;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService
  ) {
  }

  ngOnInit(): void {
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
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(lancamento)
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .subscribe(() => {
        this.tabela.reset();
        this.messageService.add({
          severity: 'success', summary: '', detail: 'Lançamento excluido com sucesso'
        });
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }
}
