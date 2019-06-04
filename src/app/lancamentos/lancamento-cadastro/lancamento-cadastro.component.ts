import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  ngOnInit() {
    const {codigo} = this.route.snapshot.params;

    if (codigo) {
      this.carregarLancamento(codigo);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .subscribe(response => {
        this.lancamento = response;
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(response => {
        this.messageService.add({
          severity: 'success', summary: '', detail: 'Lançamento adicionado com sucesso!'
        });

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', response.codigo]);
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
      .subscribe(response => {
        this.lancamento = response;
        this.messageService.add({
          severity: 'success', summary: '', detail: 'Lançamento alterado com sucesso!'
        });
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

  novo(form: NgForm) {
    form.reset();
    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);
    this.router.navigate(['/lancamentos/novo']);
  }

}
