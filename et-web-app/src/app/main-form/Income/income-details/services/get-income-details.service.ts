import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetIncomeDetailsService {
  baseUrl = 'https://etaccounting.azurewebsites.net/api/IITRFormDetails/IncomeTypeDetail/'

  constructor(private http: HttpClient) {}

  getIncomeDetailsById(id: string){
    return this.http.get(this.baseUrl+id)
  }
}
