import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../../../../../public/services/common-request.service';
import { GetIncomeDetailsService } from '../../services/get-income-details.service';

@Component({
  selector: 'app-code14-net-income-or-loss-from-business',
  templateUrl: './code14-net-income-or-loss-from-business.component.html',
  styleUrls: ['./code14-net-income-or-loss-from-business.component.css']
})
export class Code14NetIncomeOrLossFromBusinessComponent implements OnInit {
  typeList1: any = [{value: "Profit", bol: true}, {value: "Loss", bol: false}];
  typeList2: any = [{value: "Profit", bol: true}, {value: "Loss", bol: false}];
  typeList3: any = [{value: "Profit", bol: true}, {value: "Loss", bol: false}];

  incomeTypeId: string = "";
  incometypeDetailId: string = "";

  mainFormId: string = "";
  model: any = {};
  retrievedSelfData: any = {}

  constructor(private commonRequest: CommonRequestService, private getIncomeDetails: GetIncomeDetailsService) {
    this.commonRequest.getTwoIds().subscribe((data) => {
      this.mainFormId = data['mainFormId']
      this.commonRequest.getMainForm(this.mainFormId).subscribe((infor) => {
        if (infor['incomeDetailsForm']){
          this.fetchData(infor['incomeDetailsForm']['incomeTypeDetails'], "14", "netIncomeOrLossFromBusiness", "netIncomeOrLossFromBusinessId") ///
        }
      })
    })
  }

  ngOnInit() {
  }

  fetchData(model: any, id: string, type: string, deleteId: string){
    for (let i =0; i < model.length; i++){
      if (model[i]['incomeTypeId']==id){
        this.incometypeDetailId = model[i]['incomeTypeDetailId']
        this.getIncomeDetails.getIncomeDetailsById(this.incometypeDetailId).subscribe((msg) => {

            this.retrievedSelfData = msg[type]
            delete this.retrievedSelfData[deleteId]
            delete this.retrievedSelfData.incomeTypeDetailId
            this.model.incomeTypeId = id;
            this.model.apsi = this.retrievedSelfData

        })
      }
    }

  }

  showModel(){
    console.log(this.retrievedSelfData)
    console.log(this.model)
  }
}
