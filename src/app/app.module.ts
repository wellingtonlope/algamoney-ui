import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputMaskModule,
  InputTextareaModule,
  InputTextModule,
  SelectButtonModule,
  TooltipModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { MessageComponent } from './message/message.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PessoasPesquisaComponent,
    PessoaCadastroComponent,
    MessageComponent,
    PessoasGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    LancamentosModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
