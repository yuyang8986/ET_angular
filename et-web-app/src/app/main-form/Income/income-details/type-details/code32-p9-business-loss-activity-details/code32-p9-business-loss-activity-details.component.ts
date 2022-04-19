import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code32-p9-business-loss-activity-details',
  templateUrl: './code32-p9-business-loss-activity-details.component.html',
  styleUrls: ['./code32-p9-business-loss-activity-details.component.css']
})
export class Code32P9BusinessLossActivityDetailsComponent implements OnInit {
  typeList1: string[] = ['0: Passive investment - partnership', '1: Assessable income test', '2: Profits test',
  '3: Real property test', '4: Other assets test', `5: Commissioner's discretion`, '6: Arts business',
  '7: Primary production business', '8: Deferred loss', '9: Loss due to deduction for small and general business tax break'];

  typeList2: string[] = ['PR', 'AN'];

  constructor() { }

  ngOnInit() {
  }

}
