import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private authService: AuthService
  ) {
  }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

}
