import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../../services/download-file.service';
import { CommonRequestService } from '../../../../../public/services/common-request.service';
import { GetIncomeDetailsService } from '../../services/get-income-details.service';

@Component({
  selector: 'app-code4-employment-termination-payments',
  templateUrl: './code4-employment-termination-payments.component.html',
  styleUrls: ['./code4-employment-termination-payments.component.css'],
  providers: [DownloadFileService]
})
export class Code4EmploymentTerminationPaymentsComponent implements OnInit {
  fileList: any = [];
  EmploymentTerminationPaymentsList: any = [];

  typeList: string[] = [`R:Exclude life benefit termination payment for early retirement scheme, genuine redundancy, invalidity, compensation for personal injury, unfair dismissal, harassment, discrimination`, 
    `S:Exclude life benefit termination payment that is part of an excluded or non-excluded payment or transitional termination payment made in an earlier income year for the same termination of employment`, 
    `O:Non-excluded life benefit termination payment for golden handshake, gratulty, payment in lieu of notice, payment for unused sick leave, payment for unused rostered days off`, 
    `P:Non-excluded life benefit termination payment that is part of an excluded or non-excluded payment of transitional termination payment made in an earlier income year for the same termination of employment`, 
    `D:Death benefit termination payment paid to a dependant`, 
    `N:Death benefit termination payment paid to a non dependant`, 
    `B:Death benefit termination payment paid to a non dependant that is part of a payment made in an earlier income year for the same termination of employment`, 
    `M:Multiple`]
    expandArg: any = [0];
    innerArg = 1;

    length: string = "1";
    incomeTypeId: string = "";
    incometypeDetailId: string = "";
  
    mainFormId: string = "";
    model: any = {};
    retrievedSelfData: any = [{}]

  constructor(private downloadFile: DownloadFileService, private commonRequest: CommonRequestService, private getIncomeDetails: GetIncomeDetailsService) {
    this.getFiles()

    this.commonRequest.getTwoIds().subscribe((data) => {
      this.mainFormId = data['mainFormId']
      this.commonRequest.getMainForm(this.mainFormId).subscribe((infor) => {
        if (infor['incomeDetailsForm']){
          this.fetchData(infor['incomeDetailsForm']['incomeTypeDetails'], "4", "etps", "etpId") ///
        }
      })
    })
    this.model = {incomeTypeId: 4, etps: this.retrievedSelfData}
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

  getFiles(){
    this.downloadFile.getFiles().subscribe((data) => {
      if (data){
        this.fileList = data
        let reg = /-EmploymentTerminationPayments/
        for (let i=0; i<this.fileList.length; i++){
          if (reg.test(this.fileList[i])){
            this.EmploymentTerminationPaymentsList.push(this.fileList[i])
          }    
        }

        let index = 0;
        let replacedStr = "EmploymentTerminationPayments-";

        for (let i = 0; i < this.EmploymentTerminationPaymentsList.length; i++){
          this.EmploymentTerminationPaymentsList[i] = this.EmploymentTerminationPaymentsList[i].slice(61)
          index = this.EmploymentTerminationPaymentsList[i].indexOf(replacedStr)
          if(index != -1){
            this.EmploymentTerminationPaymentsList[i] = this.EmploymentTerminationPaymentsList[i].slice(replacedStr.length)
          }
        }
      }
    })
  }
  
}
