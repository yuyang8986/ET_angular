import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PutIndividualService {
  baseUrl = "https://etaccounting.azurewebsites.net/api/individual/";

  constructor(private http: HttpClient) {}

  updateIndividual(model: any){
    return this.http.put(this.baseUrl, model).pipe(
      map((response: any) => {
        const user = response;
      })
    ); 
  }
}