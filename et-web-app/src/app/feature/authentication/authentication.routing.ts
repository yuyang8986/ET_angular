import { Routes } from '@angular/router';

import { NotfoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
//import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MainFormComponent } from '../../main-form/main-form.component';
import { SendPasswordResetComponent } from './send-password-reset/send-password-reset.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BasicDetailsComponent } from 'src/app/main-form/Details/basic-details/basic-details.component';
import { UpdateDetailsComponent } from 'src/app/main-form/Details/update-details/update-details.component';


export const AuthenticationRoutes: Routes = [
      {
        path: '404',
        component: NotfoundComponent
      },

      {
        path: 'lock',
        component: LockComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'sendPasswordReset',
        component: SendPasswordResetComponent
      },
      {
        path: 'ConfirmEmail/:userId/:code',
        component: ConfirmEmailComponent
      },
      {
        path: 'ResetPassword/:userId/:token',
        component: ResetPasswordComponent
      }
      
];
