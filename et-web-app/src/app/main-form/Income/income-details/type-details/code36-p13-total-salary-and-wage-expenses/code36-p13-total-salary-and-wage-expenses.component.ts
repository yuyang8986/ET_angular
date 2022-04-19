import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code36-p13-total-salary-and-wage-expenses',
  templateUrl: './code36-p13-total-salary-and-wage-expenses.component.html',
  styleUrls: ['./code36-p13-total-salary-and-wage-expenses.component.css']
})
export class Code36P13TotalSalaryAndWageExpensesComponent implements OnInit {
  incomeTypeId: string = "";
  incometypeDetailId: string = "";

  mainFormId: string = "";
  model: any = {};
  retrievedSelfData: any = {}
  constructor() { }

  ngOnInit() {
  }

}
