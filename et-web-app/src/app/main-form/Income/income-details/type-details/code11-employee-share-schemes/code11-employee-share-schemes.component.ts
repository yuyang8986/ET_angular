import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../../services/download-file.service';
import { CommonRequestService } from '../../../../../public/services/common-request.service';
import { GetIncomeDetailsService } from '../../services/get-income-details.service';

@Component({
  selector: 'app-code11-employee-share-schemes',
  templateUrl: './code11-employee-share-schemes.component.html',
  styleUrls: ['./code11-employee-share-schemes.component.css'],
  providers: [DownloadFileService]
})
export class Code11EmployeeShareSchemesComponent implements OnInit {
  fileList: any = [];
  EmployeeShareSchemesList: any = []

  incomeTypeId: string = "";
  incometypeDetailId: string = "";

  mainFormId: string = "";
  model: any = {};
  retrievedSelfData: any = {}

  constructor(private downloadFile: DownloadFileService,private commonRequest: CommonRequestService, private getIncomeDetails: GetIncomeDetailsService) {
    this.getFiles()

    this.commonRequest.getTwoIds().subscribe((data) => {
      this.mainFormId = data['mainFormId']
      this.commonRequest.getMainForm(this.mainFormId).subscribe((infor) => {
        if (infor['incomeDetailsForm']){
          this.fetchData(infor['incomeDetailsForm']['incomeTypeDetails'], "11", "employeeShareSchemes", "employeeShareSchemesId") ///
        }
      })
    })
  }

  ngOnInit() {
  }

  getFiles(){
    this.downloadFile.getFiles().subscribe((data) => {
      if (data){
        this.fileList = data
        let reg = /-EmployeeShareSchemes/
        for (let i=0; i<this.fileList.length; i++){
          if (reg.test(this.fileList[i])){
            this.EmployeeShareSchemesList.push(this.fileList[i])
          }    
        }

        let index = 0;
        let replacedStr = "EmployeeShareSchemes-";

        for (let i = 0; i < this.EmployeeShareSchemesList.length; i++){
          this.EmployeeShareSchemesList[i] = this.EmployeeShareSchemesList[i].slice(61)
          index = this.EmployeeShareSchemesList[i].indexOf(replacedStr)
          if(index != -1){
            this.EmployeeShareSchemesList[i] = this.EmployeeShareSchemesList[i].slice(replacedStr.length)
          }
        }
      }
    })
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
