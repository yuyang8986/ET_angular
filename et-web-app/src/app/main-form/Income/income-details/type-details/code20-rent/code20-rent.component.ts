import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code20-rent',
  templateUrl: './code20-rent.component.html',
  styleUrls: ['./code20-rent.component.css']
})
export class Code20RentComponent implements OnInit {
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
