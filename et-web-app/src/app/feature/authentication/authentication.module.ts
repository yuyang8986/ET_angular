import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotfoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthenticationRoutes } from './authentication.routing';
import { ErrorInterceptorProvider } from './signup/services/error.interceptor';
import { NavComponent } from '../nav/nav.component';
import { SendPasswordResetComponent } from './send-password-reset/send-password-reset.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    FormsModule,
  ],
  providers: [
    ErrorInterceptorProvider
  ],
  declarations: [
    NotfoundComponent,
    LoginComponent,
    SignupComponent,
    LockComponent,
    NavComponent,
    SendPasswordResetComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent
  ]
  ,
  exports:[
    LoginComponent,
    SignupComponent,
    NavComponent,
    SendPasswordResetComponent,
    ConfirmEmailComponent
  ]
})
export class AuthenticationModule {}
