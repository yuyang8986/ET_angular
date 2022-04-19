import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  webUrl: string = "";
  userId: string = "";
  code: string = "";
  baseUrl: string = "";
  emailVerification = false;

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private http: HttpClient,
      private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.webUrl = this.location.path()
    // this.router.url 同样显示相对路径

    this.userId = this.activatedRoute.snapshot.paramMap.get('userId');
    this.code = this.activatedRoute.snapshot.paramMap.get('code');
    
    this.getConfirmEmail().subscribe(
      () =>{
        this.toastr.success('Email verfied successfully', 'Success')
        this.toastr.info('Now back to dashboard', 'Infor')
        this.emailVerification = true
        localStorage.removeItem('emailVerified')
        localStorage.setItem('emailVerfied', 'true')
        setTimeout(()=>{this.router.navigate(['./dashboard'])}, 3000)
      },
      (error) => {
        this.toastr.error(error, 'Error')
        this.emailVerification = false
      }
    )

  }

  getConfirmEmail(){
    this.baseUrl = "https://etaccounting.azurewebsites.net/api/auth/confirmemail?userId=" + this.userId + "&code=" + this.code
    // console.log(this.baseUrl);
    return this.http.get(this.baseUrl);
  }
}