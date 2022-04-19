import { Component } from '@angular/core';
import { RegisterServerService } from './services/register-server.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [RegisterServerService]
})
export class SignupComponent {
  errorMessage;      // for error test
  model: any = {};
  registerMode = false;  // for view test

  registerToggle(){
    this.registerMode = !this.registerMode;
  }
  
  constructor(private registerServerService: RegisterServerService
    , private router: Router, private toastr: ToastrService) {}

  register() {
    this.changeModel();
    this.registerServerService.register(this.model).subscribe(() => {
      this.toastr.success('Registrate successfully. Please log in with your new account.', 'Success')
      this.router.navigate(["/login"]);   // Manually redirect to loginComponent
    }, error => {
      //this.toastr.error(error, 'Error');
      this.toastr.error(error, 'Error')
    });
  }

  changeModel(){
    delete this.model.confirmPassword;
    this.model.role = "individual";
  }

  getAuthority(){
    if(this.model.password != this.model.confirmPassword){
      return true;
    }
    else{
      return false;
    }
  }

  showPasswordValidation(){
    if(this.model.password == this.model.confirmPassword){
      return true
    }
    else{
      return false
    }
  }

  showEmailValidation(){
    let reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    if (reg.test(this.model.email) || !this.model.email){
      return true;
    }
    else{
      return false;
    }
  }

  showPartEmailValidation(){
    let reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    if (reg.test(this.model.email)){
      return true;
    }
    else{
      return false;
    }
  }

  showAllValidation(){
    if(this.model.username && this.model.password && this.model.confirmPassword && this.model.firstname && this.model.lastname && this.model.email && this.showPartEmailValidation() && this.showPasswordValidation()){
      return true
    }
    else{
      return false
    }
  }

}
