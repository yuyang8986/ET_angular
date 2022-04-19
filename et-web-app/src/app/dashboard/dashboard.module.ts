import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationModule } from '../feature/authentication/authentication.module';
import { RouterModule } from '@angular/router'

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AuthenticationModule,
    RouterModule    
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
