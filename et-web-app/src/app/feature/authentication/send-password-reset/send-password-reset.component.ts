import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-password-reset',
  templateUrl: './send-password-reset.component.html',
  styleUrls: ['./send-password-reset.component.css']
})
export class SendPasswordResetComponent implements OnInit {
  model: any = {};
  baseUrl: string = "";

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
  }

  submit(){
    this.sendPasswordReset().subscribe(() => {
      this.toastr.success('Email sending successfully', 'Success')
    }, (error) =>{
      this.toastr.error('Wrong email input, please type the right email', 'Error')
    })
  }

  sendPasswordReset(){
    this.baseUrl = "https://etaccounting.azurewebsites.net/api/auth/SendPasswordReset?inputEmail=" + this.model.email
    return this.http.post(this.baseUrl, this.model.email)
  }

}
