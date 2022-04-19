import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file.service'
import { DownloadFileService } from '../../services/download-file.service';
import { CommonRequestService } from '../../../../../public/services/common-request.service'
import { GetIncomeDetailsService } from '../../services/get-income-details.service';

@Component({
  selector: 'app-code3-employer-lump-sum-payment',
  templateUrl: './code3-employer-lump-sum-payment.component.html',
  styleUrls: ['./code3-employer-lump-sum-payment.component.css'],
  providers: [UploadFileService]
})
export class Code3EmployerLumpSumPaymentComponent implements OnInit {
  fileList: any = [];
  EmployerLumpSumPaymentList: any = [];

  typeList: string[] = ['R:Lump sum payment from bona fide redundancy, invalidity or under an approved early retirement scheme', 'T:Other'];
  expandArg: any = [0];
  innerArg = 1;

  length: string = "1";
  incomeTypeId: string = "";
  incometypeDetailId: string = "";

  mainFormId: string = "";
  model: any = {};
  retrievedSelfData: any = [{}]

  constructor(private uploadFile: UploadFileService, private downloadFile: DownloadFileService, 
    private commonRequest: CommonRequestService, private getIncomeDetails: GetIncomeDetailsService) {
    this.getFiles()

    this.commonRequest.getTwoIds().subscribe((data) => {
      this.mainFormId = data['mainFormId']
      this.commonRequest.getMainForm(this.mainFormId).subscribe((infor) => {
        if (infor['incomeDetailsForm']){
          this.fetchData(infor['incomeDetailsForm']['incomeTypeDetails'], "3", "elsps", "elspId")
        }
      })
    })
    this.model = {incomeTypeId: 3, elsps: this.retrievedSelfData}

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
        let reg = /-EmployerLumpSumPayment/
        for (let i=0; i<this.fileList.length; i++){
          if (reg.test(this.fileList[i])){
            this.EmployerLumpSumPaymentList.push(this.fileList[i])
          }    
        }

        let index = 0;
        let replacedStr = "EmployerLumpSumPayment-";

        for (let i = 0; i < this.EmployerLumpSumPaymentList.length; i++){
          this.EmployerLumpSumPaymentList[i] = this.EmployerLumpSumPaymentList[i].slice(61)
          index = this.EmployerLumpSumPaymentList[i].indexOf(replacedStr)
          if(index != -1){
            this.EmployerLumpSumPaymentList[i] = this.EmployerLumpSumPaymentList[i].slice(replacedStr.length)
          }
        }
      }
    })
  }

}
