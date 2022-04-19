import { Injectable } from '@angular/core';;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  baseUrl = "http://etaccounting.azurewebsites.net/api/";
  dashboardUrl = 'https://etaccounting.azurewebsites.net/api/IITRIndividualDashboard/Index';
  loginToken: string;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  myHeaders = {};
  unique_name:string;

  constructor(private http: HttpClient) {
    /*this.myHeaders = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }*/
  }

  login(model: any){
    return this.http.post(this.baseUrl + "auth/login", model)
      .pipe(
        map((response: any) => {
          const user = response;    // user是token
            if (user) {
              localStorage.setItem('token', user.token);
              localStorage.setItem('emailVerified', user.emailVerified);
              this.decodedToken = this.jwtHelper.decodeToken(user.token);
              console.log(localStorage.getItem('token'));
              console.log("解析后的token是" + this.decodedToken.unique_name);
            }
        })
      )
  }

  getDashboard(){
    return this.http.get(this.dashboardUrl)
  }

}