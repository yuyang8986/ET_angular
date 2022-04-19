import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddMainFormService {
  baseUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/add"

  constructor(private http: HttpClient) {
  }

  addMainForm(model: any){
    return this.http.post(this.baseUrl, model); 
  }
}
