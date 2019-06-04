import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {
  }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha)
      .subscribe(() => {
        this.router.navigate(['/lancamentos']);
      }, error => {
        let msg = error;
        if (error.error.error === 'invalid_grant') {
          msg = 'Usuário ou senha inválida';
        }
        this.errorHandlerService.handle(msg);
      });
  }

}
