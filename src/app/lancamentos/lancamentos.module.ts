import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LancamentoService } from './lancamento.service';

import {
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextareaModule,
  InputTextModule,
  SelectButtonModule,
  TooltipModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CurrencyMaskModule,
    FormsModule,
    SharedModule,
    SelectButtonModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TooltipModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  providers: [
    LancamentoService
  ]
})
export class LancamentosModule {
}
