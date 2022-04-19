import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code19-foreign-source-income',
  templateUrl: './code19-foreign-source-income.component.html',
  styleUrls: ['./code19-foreign-source-income.component.css']
})
export class Code19ForeignSourceIncomeComponent implements OnInit {
  typeList1: string[] = ["Profit", "Loss"];
  typeList2: string[] = ["Profit", "Loss"];
  typeList3: string[] = ["Profit", "Loss"];
  typeList4: string[] = ["Profit", "Loss"];
  typeList5: string[] = ["Profit", "Loss"];
  typeList6: string[] = ["Profit", "Loss"];
  typeList7: string[] = ["Profit", "Loss"];
  typeList8: string[] = ["Profit", "Loss"];

  constructor() { }

  ngOnInit() {
  }

}
