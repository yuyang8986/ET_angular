import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code31-p8-business-income-and-expenses',
  templateUrl: './code31-p8-business-income-and-expenses.component.html',
  styleUrls: ['./code31-p8-business-income-and-expenses.component.css']
})
export class Code31P8BusinessIncomeAndExpensesComponent implements OnInit {
  typeList1: string[] = ['No rebate', 'Diesel rebate'];
  typeList2: string[] = ['Profit', 'Loss'];
  typeList3: string[] = ['C: Cost', 'M: Market selling price', 'R: Replacement value'];
  typeList4: string[] = ['S: Cents per kilometre', 'B: Log book method', `Expenses of certain other vehicles
    (motorcycles, taxis hired), utes or vans with carrying capacity over 1 tonne or 9 or more passengers`];
  typeList5: string[] = ['profit', 'loss'];
  typeList6: string[] = ['profit', 'loss'];

  constructor() { }

  ngOnInit() {
  }

}
