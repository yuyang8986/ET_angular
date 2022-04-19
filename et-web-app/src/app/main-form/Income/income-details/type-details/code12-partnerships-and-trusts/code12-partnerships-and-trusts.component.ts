import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code12-partnerships-and-trusts',
  templateUrl: './code12-partnerships-and-trusts.component.html',
  styleUrls: ['./code12-partnerships-and-trusts.component.css']
})
export class Code12PartnershipsAndTrustsComponent implements OnInit {
  typeList1: string[] = ["Profit", "Loss"];
  typeList2: string[] = ["Profit", "Loss"];
  trustsActionCode: string[] = ["T:Discretionary trading trust", "S:Discretionary service trust", "I:Discretionary investment trust", 
    "H:Hybrid trust - trust with fixed and discrtionary element", "U:Unit trust (other than Public unit trust described below)", "D:Deceased estate", 
    "P:Public unit trust - listed (other than cash management unit trust)", "Q:Public unit trust - unlisted (other than cash management unit trust)", 
    "M:Cash management unit trust", "F:Fixed trust - other than a fixed unit trust or public unit trust as described  below"];
  deductionsDistributionType1: string[] = ["D:All of the amount consists of prior year deferred non-commercial losses", 
    "P:Part of the amount consists of prior year deferred non-commercial losses"];
  typeList3: string[] = ["Profit", "Loss"];
  typeList4: string[] = ["Profit", "Loss"];
  typeList5: string[] = ["Profit", "Loss"];
  typeList6: string[] = ["Profit", "Loss"];
  typeList7: string[] = ["Profit", "Loss"];
  typeList8: string[] = ["Profit", "Loss"];
  typeList9: string[] = ["Profit", "Loss"];
  distributionFromTrustLess: string[] = ["S:Discretionary service trust", "T:Discretionary trading trust", "I:Discretionary investment trust", 
    "D:Deceased estate", "M:Cash management unit trust", "P:Public unit trust -listed (other than cash management unit trust)", "Q:Public unit trust - unlisted (other than cash management unit trust)", 
    "U:Unit trust (other than Public unit trust described below)", "F:Fixed trust - other than a fixed unit trust or public unit trust as described below", 
    "H:Hybrid trust - trust with fixed and discretionary elements"];
  deductionsDistributionType2: string[] = ["D:All of the amount consists of prior year deferred non-commercial losses", 
    "P:Part of the amount consists of prior year deferred non-commercial losses"];

  constructor() { }

  ngOnInit() {
  }

}
