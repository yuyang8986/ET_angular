import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  model: any = {};
  baseUrl: string = "https://etaccounting.azurewebsites.net/api/auth/ResetPassword";

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
  }

  submit(){
    this.model.token = this.activatedRoute.snapshot.paramMap.get('token') + "=="
    delete this.model.confirmPassword;
    this.resetPassword(this.model).subscribe(() => {
      this.toastr.success('Your password has been reset successfully', 'Success')
    }, (error) => {
      this.toastr.error(error, 'Error')
    })
  }

  resetPassword(model: any){
    return this.http.post(this.baseUrl, model)
  }
}