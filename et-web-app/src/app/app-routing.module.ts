import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './feature/authentication/login/login.component';
import { SignupComponent } from './feature/authentication/signup/signup.component';
import { NotfoundComponent } from './feature/authentication/404/not-found.component';
import { LockComponent } from './feature/authentication/lock/lock.component';
import { MainFormComponent } from './main-form/main-form.component';
import { BasicDetailsComponent } from './main-form/Details/basic-details/basic-details.component';
import { UpdateDetailsComponent } from './main-form/Details/update-details/update-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const Approutes: Routes = [
   {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
   
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: '404',
        component: NotfoundComponent
      },
      {
        path: 'lock',
        component: LockComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }

];



