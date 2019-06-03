import { Component, OnInit } from '@angular/core';

import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];

  pessoas = [];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService
  ) {
  }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .subscribe(response => {
        this.categorias = response.map(item => ({label: item.nome, value: item.codigo}));
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .subscribe(response => {
        this.pessoas = response.content.map(item => ({label: item.nome, value: item.codigo}));
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }

}
