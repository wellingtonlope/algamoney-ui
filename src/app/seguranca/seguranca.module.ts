import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { ButtonModule, InputTextModule } from 'primeng/primeng';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  loading = false;

  constructor(
    private jwtHelperService: JwtHelperService,
    private authService: AuthService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAccessTokenInvalido() && !this.loading) {
      this.loading = true;
      this.authService.obterNovoAccessToken().subscribe(() => {
        this.loading = false;
        return next.handle(req);
      }, error => {
        console.error(error);
        this.loading = false;
        return next.handle(req);
      });
    }
    return next.handle(req);
  }
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
    AuthGuard
  ]
})
export class SegurancaModule {
}
