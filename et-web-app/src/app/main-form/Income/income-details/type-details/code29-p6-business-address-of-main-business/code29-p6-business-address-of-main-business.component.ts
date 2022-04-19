import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code29-p6-business-address-of-main-business',
  templateUrl: './code29-p6-business-address-of-main-business.component.html',
  styleUrls: ['./code29-p6-business-address-of-main-business.component.css']
})
export class Code29P6BusinessAddressOfMainBusinessComponent implements OnInit {
  typeList1: string[] = ['Western Australia', 'New South Wales', 'South Australia', 
  'Queensland', 'Victoria', 'Tasmania']

  constructor() { }

  ngOnInit() {
  }

}
