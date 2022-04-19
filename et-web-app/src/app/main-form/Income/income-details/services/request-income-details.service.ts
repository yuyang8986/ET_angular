import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestIncomeDetailsService {
  baseUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/IncomeDetailsForm"

  constructor(private http: HttpClient) {}

  putIncome(model: any){
    return this.http.put(this.baseUrl, model);
  }

  postIncome(model: any){
    return this.http.post(this.baseUrl, model)
  }

}
