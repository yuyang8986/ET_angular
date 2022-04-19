import { Component, OnInit } from '@angular/core';
import { RequestMainFormService } from './services/request-main-form.service';
import { MainFormIdFromDToMService } from '../../../public/main-form-id-from-dto-m.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css'],
  providers: [RequestMainFormService]
})
export class BasicDetailsComponent implements OnInit {
  model: any = {};
  requestMethod = "";
  mainFormId = "";
  yearModel: any = {};
  lastTaxYear: string = "";
  nowTaxYear: string = "";

  modalText1: string =`Your tax refund is sent directly to your bank account, helping you get your refund quickly. Enter an account that you own or have direct access to. It is not always possible to recover funds if you enter incorrect bank account details.
  Why do I have to enter my bank details?In 2013, the ATO made it a requirement that all electronically lodged tax returns must include a taxpayers’ bank details. This helps improve security and ensures your refund can reach you quickly.
  Can I use another person’s bank account?You should use your own bank account if possible.
  If you enter another person's bank account details, your tax refund will be sent to that person's account. In that case, getting the refund back from that person is YOUR responsibility. It is not possible to un-do this transfer after it is sent to the account details you provide.
  Can I get my refund by cheque?No, tax refunds are transferred directly to your bank account.
  Are my bank details safe?Yes: ET Accounting uses high-level online encryption and holds an Extended SSL security certificate provided by Verisign – this is the industry standard used by banks and other financial institutions.
  Can someone take money out of my account?No. Providing your bank account number and BSB enables deposits into your account.
  Security tips:Your Account Number and BSB are required for any funds transfer (deposit), and are different to your online banking password or PIN. Never share your banking password with anyone.
  If you don't know your bank details, simply ring your bank and ask for your Account Number and BSB.`
  modalText2: string = `If you will need to lodge an Australian Tax Return again next year, please click 'no'. If you have left Australia permanently, please click 'yes'.
  If you are completing this return on behalf of a deceased person, please click 'yes'.`

  constructor(private requestMainFormService: RequestMainFormService, public mainFormIdFromDToM: MainFormIdFromDToMService,
    private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {

    this.model.isLastITRInAu
    this.model.isAustralianCitizenship = null
    this.model.isLiveFullYearInAu = null

    this.yearModel.year = sessionStorage.getItem('lian').toString()
    this.lastTaxYear = sessionStorage.getItem('lian')
    this.nowTaxYear = (Number(this.lastTaxYear) + 1).toString()
    this.requestMainFormService.getIds(this.yearModel).subscribe((data) => {
      this.mainFormId = data['mainFormId']

      this.requestMainFormService.getMainFormById(this.mainFormId).subscribe((data) => {
        if (data['basicDetailsForm']){
          this.requestMethod = "put"       // bind button to pup method if there is data
          
          let basicDetailsForm = data['basicDetailsForm']
          this.model = {
            "id": basicDetailsForm['id'],
            "mainFormId": basicDetailsForm['mainFormId'],
            "isLastITRInAu": basicDetailsForm['isLastITRInAu'],
            "isAustralianCitizenship": basicDetailsForm['isAustralianCitizenship'],
            "isLiveFullYearInAu": basicDetailsForm['isLiveFullYearInAu'],
  
            "bsb": basicDetailsForm['bsb'],
            "accountNo": basicDetailsForm['accountNo'],
            "accountName": basicDetailsForm['accountName'],
  
            "hasHELPOrTSL": basicDetailsForm['hasHELPOrTSL'],
            "hasSFSS": basicDetailsForm['hasSFSS'],
            "hasOtherTaxDebt": basicDetailsForm['hasOtherTaxDebt']
  
          }

        }
        else{
          this.requestMethod = "post"
          this.model.mainFormId = this.mainFormId     // 在空表中添加mainformid
   
        }
      })

    })

  }

  showBsbValidation(){
    let reg = /\d\d\d\d\d\d/;
    if (reg.test(this.model.bsb) || !this.model.bsb){
      return true;
    }
    else {
      return false;
    }
  }

  showAccountNumberValidation(){
    let reg = /^\d{1,10}$/;
    if (reg.test(this.model.accountNo) || !this.model.accountNo){
      return true;
    }
    else {
      return false;
    }
  }

  showCheckedValidation(){
    if (this.model.isLastITRInAu != undefined && this.model.isAustralianCitizenship != undefined && this.model.isLiveFullYearInAu != undefined
      && this.model.hasHELPOrTSL != undefined && this.model.hasSFSS != undefined && this.model.hasOtherTaxDebt != undefined){
      return true
    }
    else {
      return false
    }
  }

  onSubmit(){
    if (this.showCheckedValidation()){
      if(this.requestMethod=="put"){
        this.requestMainFormService.putMainForm(this.model).subscribe(() => {
          this.toastr.success('Upload successfully', 'Success');
          this.router.navigate(["/mainForm/myIncome"])
        }, error => {this.toastr.error(error, 'Error')})
      }
      else if(this.requestMethod=="post"){
        this.requestMainFormService.postMainForm(this.model).subscribe(() => {
          this.toastr.success('Upload successfully', 'Success');
          this.router.navigate(["/mainForm/myIncome"])
        }, error => {this.toastr.error(error, 'Error')})
      }
    }

    else {
      this.toastr.warning('Please check all radio buttons','warning')
    }
  }

  showModel(){
    console.log(this.model)
    console.log(this.requestMethod)
  }

}