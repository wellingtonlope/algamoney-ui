import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  ngOnInit() {
    const {codigo} = this.route.snapshot.params;

    this.title.setTitle('Nova pessoa');

    if (codigo) {
      this.carregarPessoa(codigo);
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .subscribe(response => {
        this.pessoa = response;
        this.atualizarTituloEdicao();
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success', summary: '', detail: 'Pessoa adicionada com sucesso'
        });
        form.reset();
        this.pessoa = new Pessoa();
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .subscribe(response => {
        this.pessoa = response;
        this.messageService.add({
          severity: 'success', summary: '', detail: 'Pessoa alterada com sucesso'
        });
        this.atualizarTituloEdicao();
      }, (erro: any) => {
        this.errorHandlerService.handle(erro);
      });
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);
    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição da pessoa: ${this.pessoa.nome}`);
  }

}
