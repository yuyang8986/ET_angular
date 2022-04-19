import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassMainFormIdService {
  dataArray: string[] = [];

  insertData(data: string){
    this.dataArray.push(data)
  }
  constructor() {}
}