import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-id4-work-related-uniform-occupation',
  templateUrl: './id4-work-related-uniform-occupation.component.html',
  styleUrls: ['./id4-work-related-uniform-occupation.component.css']
})
export class Id4WorkRelatedUniformOccupationComponent implements OnInit {
  typeList1: string[] = [];
  typeList2: string[] = [];
  workRelatedUniformList: string[] = [];

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
