import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetLocalTimeService {
  localHours: string;
  constructor() { }

  getLocalHours(){
    this.localHours = new Date().getHours().toString();
  }
}
