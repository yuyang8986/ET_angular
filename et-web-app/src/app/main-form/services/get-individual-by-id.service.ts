import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetIndividualByIdService {
  myHeaders = {};
  individualId: string = sessionStorage.getItem('individualId')
  baseUrl = "https://etaccounting.azurewebsites.net/api/individual/" + this.individualId
  occupationUrl = "https://etaccounting.azurewebsites.net/api/occupations";

  constructor(public http: HttpClient) { 
    /*this.myHeaders = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }*/
  }

  getIndividual(){
    return this.http.get(this.baseUrl)
  }

  getFullOccupation(){
    return this.http.get(this.occupationUrl)
  }

}