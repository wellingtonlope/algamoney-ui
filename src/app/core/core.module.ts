import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { CommonModule, registerLocaleData } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, ConfirmDialogModule, MessageService } from 'primeng/primeng';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { CategoriaService } from '../categorias/categoria.service';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    {provide: LOCALE_ID, useValue: 'pt'},
    CategoriaService
  ]
})
export class CoreModule {
}
