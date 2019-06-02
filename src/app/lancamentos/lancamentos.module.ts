import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FormsModule } from '@angular/forms';

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
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    CurrencyMaskModule,
    FormsModule,
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
    LancamentosGridComponent,
    LancamentosPesquisaComponent
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ]
})
export class LancamentosModule {
}
