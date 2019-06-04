import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';

import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';

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
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private pessoaService: PessoaService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.params.codigo);

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success', summary: '', detail: 'Lançamento salvo com sucesso'
        });
        form.reset();
        this.lancamento = new Lancamento();
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
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
