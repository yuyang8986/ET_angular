import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../../../../../public/services/common-request.service';
import { GetIncomeDetailsService } from '../../services/get-income-details.service';

@Component({
  selector: 'app-code22-forestry-managed-investment-scheme-income',
  templateUrl: './code22-forestry-managed-investment-scheme-income.component.html',
  styleUrls: ['./code22-forestry-managed-investment-scheme-income.component.css']
})
export class Code22ForestryManagedInvestmentSchemeIncomeComponent implements OnInit {

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
          this.fetchData(infor['incomeDetailsForm']['incomeTypeDetails'], "22", "fmisi", "FMISIId") ///
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
