import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RequestIncomeTypeService {
  baseUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/IncomeTypes"
  putUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/IncomeTypesForm"
  postUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/IncomeTypesForm"

  constructor(private http: HttpClient) {
  }

  getAllIncomeType(){
    return this.http.get(this.baseUrl)
  }

  putIncomeType(model: any){
    return this.http.put(this.putUrl, model)
  }
  
  postIncomeType(model: any){
    return this.http.post(this.postUrl, model)
  }

}
