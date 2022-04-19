import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommonRequestService {

  getTwoIdsUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/GetMainFormIdByYear"
  getMainFormUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/"    // By mainFormId
  getIncomeTypeDetailUrl = "https://etaccounting.azurewebsites.net/api/IITRFormDetails/IncomeTypeDetail/"     // By incomeTypeDetailId in mainForm
  yearModel: any = {}

  constructor(private http: HttpClient) {
  }

  getTwoIds(){
    this.yearModel.year = sessionStorage.getItem('lian');
    return this.http.post(this.getTwoIdsUrl, this.yearModel)
  }

  getMainForm(mainFormId: any){
    return this.http.get(this.getMainFormUrl + mainFormId)
  }

  getIncomeTypeDetail(incomeTypeDetailId: any){
    return this.http.get(this.getIncomeTypeDetailUrl + incomeTypeDetailId)
  }
}
