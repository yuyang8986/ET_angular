import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code34-p11-trade-debtors',
  templateUrl: './code34-p11-trade-debtors.component.html',
  styleUrls: ['./code34-p11-trade-debtors.component.css']
})
export class Code34P11TradeDebtorsComponent implements OnInit {
  incomeTypeId: string = "";
  incometypeDetailId: string = "";

  mainFormId: string = "";
  model: any = {};
  retrievedSelfData: any = {}
  constructor() { }

  ngOnInit() {
  }

}
