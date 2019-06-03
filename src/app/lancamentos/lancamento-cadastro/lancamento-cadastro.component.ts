import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  currency: number;
  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];

  pessoas = [
    {label: 'João da Silva', value: 1},
    {label: 'Sebastião Souza', value: 2},
    {label: 'Maria Abadia', value: 3}
  ];

  constructor(
    private categoriaService: CategoriaService,
    private errorHandlerService: ErrorHandlerService
  ) {
  }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .subscribe(response => {
        this.categorias = response.map(item => ({label: item.nome, value: item.codigo}));
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }

}
