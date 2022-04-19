import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetMainFormService {
  baseUrl = "https://etaccounting.azurewebsites.net/api/iitrmain/"

  constructor(private http: HttpClient) { }

  getMainForm(id: any){
    return this.http.get(this.baseUrl + id)
  }
}
