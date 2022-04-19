import { Component } from '@angular/core';
import { ServerService } from './services/server.service';
import { Router } from '@angular/router';
import { AccountInfor } from './services/returnedJson';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ServerService]
})
export class LoginComponent {
  model: any = {};
  dashboardUrl;  // 测试用url
  accountInfor: AccountInfor;
  
  constructor(private serverService: ServerService, private toastr: ToastrService,
    private router: Router) {}

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(){    
    this.serverService.login(this.model).subscribe(response => {
      this.toastr.success('Log in successful', 'Sucess')
      this.router.navigate(["/dashboard"]);     // 手动导航
    }, error => {
      this.toastr.error(error, 'Error')
    });
  
  }
}