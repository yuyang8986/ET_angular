import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-id3-work-related-travel-expenses',
  templateUrl: './id3-work-related-travel-expenses.component.html',
  styleUrls: ['./id3-work-related-travel-expenses.component.css']
})
export class Id3WorkRelatedTravelExpensesComponent implements OnInit {
  typeList1: string[] = [];

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
