import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code23-other-income',
  templateUrl: './code23-other-income.component.html',
  styleUrls: ['./code23-other-income.component.css']
})
export class Code23OtherIncomeComponent implements OnInit {
  typeList1: string[] = ['S: Salary and wage income', 'N: Non provisional income']
  typeList2: string[] = ['S: Salary and wage income', 'N: Non provisional income']

  expandArg: any = [0];
  innerArg = 1;
  constructor() { }

  ngOnInit() {
  }

  addNewLines(){
    if (this.expandArg.length <= 7){
      this.expandArg.push(this.innerArg)
      this.innerArg += 1
      console.log(this.expandArg)
    }
    else {
      alert('You can have at most 8 lines')
    }
  }

  removeOneLine(){
    if (this.expandArg.length >= 2){
      this.expandArg.pop()
      this.innerArg -= 1
      console.log(this.expandArg)
    }
    else {
      alert('1 line left')
    }
  }


}
