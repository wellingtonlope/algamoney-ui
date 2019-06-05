import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  logout() {
    this.auth.limparAccessToken()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
