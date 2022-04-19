import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../../services/download-file.service';
import { CommonRequestService } from '../../../../../public/services/common-request.service';
import { GetIncomeDetailsService } from '../../services/get-income-details.service';

@Component({
  selector: 'app-code17-capital-gains-or-losses',
  templateUrl: './code17-capital-gains-or-losses.component.html',
  styleUrls: ['./code17-capital-gains-or-losses.component.css'],
  providers: [DownloadFileService]
})
export class Code17CapitalGainsOrLossesComponent implements OnInit {
  fileList: any = [];
  CapitalGainsOrLossesList:any = [];

  incomeTypeId: string = "";
  incometypeDetailId: string = "";

  mainFormId: string = "";
  model: any = {};
  retrievedSelfData: any = {}

  typeList1: string[] = ["A: Small business active asset reduction (Subdivision 152-C)", "B: Small business retirement exemption (Subdivision 152-D)", 
    "C: Small business roll-over (Subdivision 152-E)", "D: Small business 15 year exemption (Subdivision 152-B)", 
    "E: Foreign resident CGT exemption (Division 855)", "F: Scrip for scrip roll-over (Subdivision 124-M)", 
    "I: Main residence exemption (Subdivision 118-B)", "J: Capital gains disregarded as a result of the sale of the sale of a pre-CGT asset", 
    "K: Disposal or creation of assets in a wholly-owned company (Division 122)", "L: Replacement asset roll-overs (Division 124)",  
    "M: Exchange of shares or units (Subdivision 124-E)", "N: Exchange of rights of options (Subdivision 124-F)", 
    "O: Exchange of shares in one", "P: Exchange of units in a unit trust for shares in a company (Division 615)",
    "R: Demeger roll-over (Subdivision 125-B)", "S: Same asset roll-overs (Division 126)", 
    "T: Small business resturcture roll-over (Subdivision 328-G)", "U: Early stage investor (Subdivision 360-A)",
    "V: Venture capital investment (Subdivision 118-F)", "X: Other exemptions and rollovers"]

  constructor(private downloadFile: DownloadFileService, private commonRequest: CommonRequestService, private getIncomeDetails: GetIncomeDetailsService) {
    this.getFiles()

    this.commonRequest.getTwoIds().subscribe((data) => {
      this.mainFormId = data['mainFormId']
      this.commonRequest.getMainForm(this.mainFormId).subscribe((infor) => {
        if (infor['incomeDetailsForm']){
          this.fetchData(infor['incomeDetailsForm']['incomeTypeDetails'], "17", "netFarmManagementDepositOrRepayments", "netFarmManagementDepositOrRepaymentsId") ///
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
        let reg = /-CapitalGainsOrLosses/
        for (let i=0; i<this.fileList.length; i++){
          if (reg.test(this.fileList[i])){
            this.CapitalGainsOrLossesList.push(this.fileList[i])
          }    
        }

        let index = 0;
        let replacedStr = "CapitalGainsOrLosses-";

        for (let i = 0; i < this.CapitalGainsOrLossesList.length; i++){
          this.CapitalGainsOrLossesList[i] = this.CapitalGainsOrLossesList[i].slice(61)
          index = this.CapitalGainsOrLossesList[i].indexOf(replacedStr)
          if(index != -1){
            this.CapitalGainsOrLossesList[i] = this.CapitalGainsOrLossesList[i].slice(replacedStr.length)
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
