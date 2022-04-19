import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterServerService {
  baseUrl = "http://etaccounting.azurewebsites.net/api/auth/register";
  constructor(private http: HttpClient) { }

  register(model: any){
    return this.http.post(this.baseUrl, model)
      .pipe(
        map((response: any) => {
          const user = response;
        })
      )
  }
}
