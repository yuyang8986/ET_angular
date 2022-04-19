import { Component, OnInit } from '@angular/core';
import { CommonRequestService } from '../../../../../public/services/common-request.service';
import { GetIncomeDetailsService } from '../../services/get-income-details.service';

@Component({
  selector: 'app-code7-australian-superannuation-lump-sum-payments',
  templateUrl: './code7-australian-superannuation-lump-sum-payments.component.html',
  styleUrls: ['./code7-australian-superannuation-lump-sum-payments.component.css']
})
export class Code7AustralianSuperannuationLumpSumPaymentsComponent implements OnInit {
  typeList: string[] = [`N:Where the death benefit was made to a non dependant`, 
    `M:Multiple payments`]

    expandArg: any = [0];
    innerArg = 1;
    
    length: string = "1";
    incomeTypeId: string = "";
    incometypeDetailId: string = "";
  
    mainFormId: string = "";
    model: any = {};
    retrievedSelfData: any = [{}]

  constructor(private commonRequest: CommonRequestService, private getIncomeDetails: GetIncomeDetailsService) {
    this.commonRequest.getTwoIds().subscribe((data) => {
      this.mainFormId = data['mainFormId']
      this.commonRequest.getMainForm(this.mainFormId).subscribe((infor) => {
        if (infor['incomeDetailsForm']){
          this.fetchData(infor['incomeDetailsForm']['incomeTypeDetails'], "7", "aslsps", "aslspId")
        }
      })
    })
    this.model = {incomeTypeId: 7, aslsps: this.retrievedSelfData}
  }

  ngOnInit() {
  }

  addNewLines(){
    if (this.expandArg.length <= 7){
      this.expandArg.push(this.innerArg)
      this.innerArg += 1
      console.log(this.expandArg)
      this.retrievedSelfData.push({})
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
      this.retrievedSelfData.pop()
    }
    else {
      alert('1 line left')
    }
  }

  fetchData(model: any, id: string, type: string, deleteId: string){
    for (let i =0; i < model.length; i++){
      if (model[i]['incomeTypeId']==id){
        this.incometypeDetailId = model[i]['incomeTypeDetailId']
        this.getIncomeDetails.getIncomeDetailsById(this.incometypeDetailId).subscribe((msg) => {
          this.length = msg[type].length
          for (let k = 0; k < Number(this.length); k++){
            this.retrievedSelfData[k] = msg[type][k]
            delete this.retrievedSelfData[k][deleteId]
            delete this.retrievedSelfData[k].incomeTypeDetailId
            if (this.retrievedSelfData[k].dateOfPayment){
              this.retrievedSelfData[k].dateOfPayment = this.retrievedSelfData[k].dateOfPayment.substr(0,10)
            }    ////////
          }

          if (this.length){
            for (let j = 1; j < Number(this.length); j++){
              this.expandArg.push(0)
            }
          }

        })
      }
    }

  }

  showModel(){
    console.log(this.retrievedSelfData)
    console.log(this.model)
  }

}
