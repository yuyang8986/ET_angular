import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeductionService {
  getOccupationUrl = "https://etaccounting.azurewebsites.net/api/occupations/";
  getAllDeductionUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/DeductionTypes";
  sendDeductionUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/DeductionTypesForm";

  constructor(private http: HttpClient) {}

  getOccupationById(occupationId: string){
    return this.http.get(this.getOccupationUrl + occupationId)
  }

  getAllDeductionTypes(model: any){   // 实际上是post方法
    return this.http.post(this.getAllDeductionUrl, model)
  }

  putDeduction(model: any){
    return this.http.put(this.sendDeductionUrl, model)
  }

  postDeduction(model: any){
    return this.http.post(this.sendDeductionUrl, model)
  }
}
