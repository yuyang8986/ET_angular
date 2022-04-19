import { Component, OnInit } from '@angular/core';
import { ServerService } from './feature/authentication/login/services/server.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PassMainFormIdService } from './public/pass-main-form-id.service';     // public component service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PassMainFormIdService]
})
export class AppComponent {
  title = 'app';
  jwtHelper = new JwtHelperService();

  constructor(private serverService: ServerService){}

  ngOnInit(){
    const token = localStorage.getItem('token');
    if(token){
      this.serverService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

}
