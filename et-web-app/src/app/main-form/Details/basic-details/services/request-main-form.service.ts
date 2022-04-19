import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestMainFormService {

  baseGetUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/"
  basePostUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/BasicDetails"
  basePutUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/BasicDetails"

  baseIdUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/GetMainFormIdByYear"     // for geting 2 ids

  constructor(private http: HttpClient) {
  }

  getMainFormById(mainFormId: any){
    return this.http.get(this.baseGetUrl + mainFormId)
  }

  postMainForm(model: any){
    return this.http.post(this.basePostUrl, model)
  }

  putMainForm(model: any){
    return this.http.put(this.basePutUrl, model)
  }

  getIds(year: any){
    return this.http.post(this.baseIdUrl, year)
  }

}
