import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://etaccounting.azurewebsites.net/api/Files/uploadfile"

  uploadFile(model: any){
    return this.http.post(this.baseUrl, model)
  }

  errorHandling(){

  }

}
