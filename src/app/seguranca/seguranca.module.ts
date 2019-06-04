import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule, InputTextModule } from 'primeng/primeng';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ]
})
export class SegurancaModule {
}
