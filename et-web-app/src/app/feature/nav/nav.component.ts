import { Component, OnInit } from '@angular/core';
import { ServerService } from '../authentication/login/services/server.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [ServerService]
})
export class NavComponent implements OnInit {

  model: any = {}; // store username and password
  constructor(public serverService: ServerService) { }

  login(){
    this.serverService.login(this.model).subscribe(next => {
      console.log('logged in successfully');
    }, error => {
      console.log('failed to login');
    });
  }
  
  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('individualId');
    localStorage.removeItem('emailVerified');
    console.log('logged out');
  }

  ngOnInit() {
  }

}
