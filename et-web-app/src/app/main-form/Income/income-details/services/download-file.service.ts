import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {
  baseUrl = 'https://etaccounting.azurewebsites.net/api/Files/getfile'

  constructor(private http: HttpClient) {}

  getFiles(){
    return this.http.get(this.baseUrl);
  }

}
