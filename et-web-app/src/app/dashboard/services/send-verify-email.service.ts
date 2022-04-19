import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendVerifyEmailService {
  baseUrl = "https://etaccounting.azurewebsites.net/api/auth/SendVerifyEmail";
  constructor(public http: HttpClient) { }

  sendEmail(){
    return this.http.get(this.baseUrl)
  }
}
