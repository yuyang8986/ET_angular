import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonRequestService } from '../../../public/services/common-request.service';
import { ToastrService } from 'ngx-toastr';
import { GetIncomeDetailsService } from './services/get-income-details.service';
import { RequestIncomeDetailsService } from './services/request-income-details.service';

@Component({
  selector: 'app-income-details',
  templateUrl: './income-details.component.html',
  styleUrls: ['./income-details.component.css'],
  providers: [CommonRequestService, ToastrService, GetIncomeDetailsService]
})
export class IncomeDetailsComponent implements OnInit {
  modalText1: string = `Please fill all of the necessary parts of each table. If there is a file to be uploaded, upload it and click the 
    green button (attach file) in that particular table. When everything is done, click the bottom button (Submit).`
  infor: string = "";
  requestModel: any = {};
  
  mainFormId: string = "";
  requestMethod: string = "";
  incomeTypeDetails: any = [];
  incomeTypeDetailsData: any = [];

  @ViewChild('id1') refId1: ElementRef; @ViewChild('id2') refId2: ElementRef; @ViewChild('id3') refId3: ElementRef; @ViewChild('id4') refId4: ElementRef;

  constructor(private commonRequest: CommonRequestService, private toastr: ToastrService, private getIncomeDetailsService: GetIncomeDetailsService, 
      private requestIncome: RequestIncomeDetailsService) {
    this.commonRequest.getTwoIds().subscribe((data) => {
      this.mainFormId = data['mainFormId'];
      this.buildModel();
      this.commonRequest.getMainForm(this.mainFormId).subscribe((infor) => {
        if (infor['incomeDetailsForm']) {
          this.requestMethod = 'put';
          this.incomeTypeDetails = infor['incomeDetailsForm']['incomeTypeDetails']
          this.fetchIncomeDetailsData();
        }
        if (!infor['incomeDetailsForm']) {
          this.requestMethod = 'post'
        }
        if (infor['incomeTypeForm']){
          
        } 
        this.toastr.info(this.requestMethod, 'Infor')
      })
    })

  }

  ngOnInit() {
  }

  // Retrieve 
  fetchIncomeDetailsData(){
    for (let i = 0; i < this.incomeTypeDetails.length; i++){
      this.getIncomeDetailsService.getIncomeDetailsById(this.incomeTypeDetails[i]['incomeTypeDetailId']).subscribe((msg) => {
        this.incomeTypeDetailsData.push(msg)
      })
    }
  }

  showModel(){
    // console.log(this.model)
    console.log('mainformId: ' + this.mainFormId)
    console.log('incomeTypeDetails: ')
    console.log(this.incomeTypeDetails)
    console.log('incomeDetailsTypeData: ')
    console.log(this.incomeTypeDetailsData)
    console.log('现在的model是: ')
    console.log(this.requestModel)
  }

  onclick(){
  }

  buildModel(){
    this.requestModel.mainFormId = this.mainFormId
  }

  onUpdate(){
    /*console.log(this.refId1['model'])
    console.log(this.refId2['model'])
    console.log(this.refId3['model'])
    console.log(this.refId4['model'])*/

    this.toastr.info('现在只能更新前四个', 'Infor')
    this.requestModel.incomeTypeDetails = [this.refId1['model'],this.refId2['model'],this.refId3['model'],this.refId4['model']]
    console.log(this.requestModel)
    
    if(this.requestMethod == "put"){
      this.requestIncome.putIncome(this.requestModel).subscribe(next => {
        this.toastr.success('Put successfully', 'Success');
      }, (error) => {
        this.toastr.error(error, 'Error');
      })
    }

    if(this.requestMethod == "post"){
      this.requestIncome.postIncome(this.requestModel).subscribe(next => {
        this.toastr.success('Post successfully', 'Success')
      }, (error) => {
        this.toastr.error(error, 'Error');
      })
    }

  }


}
