import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServerService } from '../feature/authentication/login/services/server.service';
import { AccountInfor } from '../feature/authentication/login/services/returnedJson';
import { GetLocalTimeService } from './services/get-local-time.service';
import { Lodgement } from './interfaces/lodgementInterface';
import { Dict } from './interfaces/dictInterface';
import { Status } from './interfaces/statusInterface';
import { SendVerifyEmailService } from './services/send-verify-email.service';
import { AddMainFormService } from './services/add-main-form.service';
import { PassMainFormIdService } from '../public/pass-main-form-id.service';
import { MainFormIdFromDToMService } from '../public/main-form-id-from-dto-m.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ServerService, GetLocalTimeService, SendVerifyEmailService,
    AddMainFormService]
})
export class DashboardComponent implements OnInit {
  accountInfor: AccountInfor;  // 暂存返回的json信息
  currentHour: string;
  model: any = {};
  mainFormId: string = "";
  
  mainFormList: string [] = []; 

  toggle: Dict = {
    startToggleYear1: false, continueToggleYear1: false, viewDetailsToggleYear1: false, startToggleYear2: false, continueToggleYear2: false, viewDetailsToggleYear2: false,
    startToggleYear3: false, continueToggleYear3: false, viewDetailsToggleYear3: false, startToggleYear4: false, continueToggleYear4: false, viewDetailsToggleYear4: false,
    startToggleYear5: false, continueToggleYear5: false, viewDetailsToggleYear5: false, startToggleYear6: false, continueToggleYear6: false, viewDetailsToggleYear6: false, 
    startToggleYear7: false, continueToggleYear7: false, viewDetailsToggleYear7: false, startToggleYear8: false, continueToggleYear8: false, viewDetailsToggleYear8: false
  }
  status: Status = {
    notStartedYear1: false, incompleteYear1: false, completedYear1: false, notStartedYear2: false, incompleteYear2: false, completedYear2: false, notStartedYear3: false, incompleteYear3: false, completedYear3: false, 
    notStartedYear4: false, incompleteYear4: false, completedYear4: false, notStartedYear5: false, incompleteYear5: false, completedYear5: false, notStartedYear6: false, incompleteYear6: false, completedYear6: false, 
    notStartedYear7: false, incompleteYear7: false, completedYear7: false, notStartedYear8: false, incompleteYear8: false, completedYear8: false
  }
  
  // taxYear1为当日的退税年，taxyear8为可报税的最早一年； eg：taxYear1 = 2018; taxYear8 = 2011;
  // year1:2018 2:2017 3:2016 4:2015 5:2014 6:2013 7:2012 8:2011
  localYear: number; localMonth: number; localDate: number;
  taxYear1: number; taxYear2: number; taxYear3: number; taxYear4: number; taxYear5: number; taxYear6: number; taxYear7: number; taxYear8: number;

  dict: Lodgement[] = [];   // 最多存放8个lodgement对象
  yearList: number[] = [];
  emailVerified = null;

  constructor(public serverService: ServerService, public getLocalTimeService: GetLocalTimeService, public sendVerifyEmailService: SendVerifyEmailService,
    public addMainFormService: AddMainFormService, public passMainFormIdService: PassMainFormIdService, public mainFormIdFromDToM: MainFormIdFromDToMService, 
    private toastr: ToastrService) 
  { 
    this.serverService.getDashboard()
      .subscribe(
        (data: AccountInfor) => {this.accountInfor = {
          firstName: data['firstName'],
          lastName: data['lastName'],
          individualId: data['individualId'],
          iitrLodgements: data['iitrLodgements']
        };

        this.model.individualId = data['individualId'].toString();
        sessionStorage.setItem('individualId', this.accountInfor.individualId.toString());
        this.getEightYears();    // 返回包括今年(退税年)在内之前八年   // 最先调用
        console.log("成功了");
  
        let length = this.accountInfor.iitrLodgements.length;
        //console.log('数组的长度为' + length);

        this.addMainFormId(data['iitrLodgements']);
        //console.log('mainformlist是' + this.passMainFormIdService.dataArray)

        // 以下提取lodgement内容
        if (this.accountInfor.iitrLodgements.length != 0 ){
          for (let n = 0; n < this.accountInfor.iitrLodgements.length; n++){
            this.dict[n] = this.accountInfor.iitrLodgements[n];  // 把所有的lodgement json 对象复制进dict数组中
            this.yearList[n] = this.accountInfor.iitrLodgements[n].financialYear.year;
            //console.log('列表里是：' + this.yearList[0]);  // 把所有的year都加进yearList数组里            
          }

          this.setLackedYearToggle();    // 判断哪年有记录哪年没有 (status也一并判断了)
            this.setFinancialYear();    // 判断并设置每一年的action和status
        }
        else{
          this.setStartToggle();    // 若lodgements为空，则将2011-2018所有的startToggle打开(已成功)
          this.setNotStartedStatus();   // 设置2012-2018年status为not started
        }
        console.log('dict的长度是' + this.dict.length);   // for test

        console.log('startToggle2017: ' + this.toggle.startToggleYear2);
        },
        
        (error) => {
          this.toastr.error(error, 'Error');   
      }
        
      )
    
    this.getLocalTimeService.getLocalHours();
    this.currentHour = this.getLocalTimeService.localHours;
    console.log('现在' + this.currentHour + '点了');
    console.log(this.dict[0]);
    
    this.emailVerified = localStorage.getItem('emailVerified')
  }
  
  setLackedYearToggle(){
    let fullYearList: number[] = [this.taxYear8,this.taxYear7,this.taxYear6,this.taxYear5,
      this.taxYear4,this.taxYear3,this.taxYear2,this.taxYear1];
    for (let element of this.yearList){
      let index = fullYearList.indexOf(element);
      fullYearList.splice(index,1)
    }
    console.log(fullYearList);
    for (let n of fullYearList){
      if(n == this.taxYear8){ this.toggle.startToggleYear8 = true; this.status.notStartedYear8 = true}   // 2011最早一年
      if(n == this.taxYear7){ this.toggle.startToggleYear7 = true; this.status.notStartedYear7 = true}
      if(n == this.taxYear6){ this.toggle.startToggleYear6 = true; this.status.notStartedYear6 = true}
      if(n == this.taxYear5){ this.toggle.startToggleYear5 = true; this.status.notStartedYear5 = true}
      if(n == this.taxYear4){ this.toggle.startToggleYear4 = true; this.status.notStartedYear4 = true}
      if(n == this.taxYear3){ this.toggle.startToggleYear3 = true; this.status.notStartedYear3 = true}
      if(n == this.taxYear2){ this.toggle.startToggleYear2 = true; this.status.notStartedYear2 = true}
      if(n == this.taxYear1){ this.toggle.startToggleYear1 = true; this.status.notStartedYear1 = true}   // 2018当前年
    }
  }
  
  setStartToggle(){
    this.toggle.startToggleYear1 = true; this.toggle.startToggleYear2 = true; this.toggle.startToggleYear3 = true; this.toggle.startToggleYear4 = true;
    this.toggle.startToggleYear5 = true; this.toggle.startToggleYear6 = true; this.toggle.startToggleYear7 = true; this.toggle.startToggleYear8 = true;
  }
  
  setYears(){
    for (let n = 0; 0< this.dict.length; n++){
      this.yearList.push(this.dict[n].financialYear.year);
    }  
  }
  
  setFinancialYear(){     // 设置三种绑定按钮Toggle
    for (let n = 0; n < this.dict.length; n++){
      console.log(this.dict[n]);
      if (this.dict[n].lodgementStatus == 'Not Started'){
        if (this.dict[n].financialYear.year == this.taxYear1){this.toggle.startToggleYear1 = true; this.status.notStartedYear1 = true}
        if (this.dict[n].financialYear.year == this.taxYear2){this.toggle.startToggleYear2 = true; this.status.notStartedYear2 = true}
        if (this.dict[n].financialYear.year == this.taxYear3){this.toggle.startToggleYear3 = true; this.status.notStartedYear3 = true}
        if (this.dict[n].financialYear.year == this.taxYear4){this.toggle.startToggleYear4 = true; this.status.notStartedYear4 = true}
        if (this.dict[n].financialYear.year == this.taxYear5){this.toggle.startToggleYear5 = true; this.status.notStartedYear5 = true}
        if (this.dict[n].financialYear.year == this.taxYear6){this.toggle.startToggleYear6 = true; this.status.notStartedYear6 = true}
        if (this.dict[n].financialYear.year == this.taxYear7){this.toggle.startToggleYear7 = true; this.status.notStartedYear7 = true}
        if (this.dict[n].financialYear.year == this.taxYear8){this.toggle.startToggleYear8 = true; this.status.notStartedYear8 = true}
      }   // not started 判断结束

      if (this.dict[n].lodgementStatus == 'Incomplete'){
        if (this.dict[n].financialYear.year == this.taxYear1){this.toggle.continueToggleYear1 = true; this.status.incompleteYear1 = true}
        if (this.dict[n].financialYear.year == this.taxYear2){this.toggle.continueToggleYear2 = true; this.status.incompleteYear2 = true}
        if (this.dict[n].financialYear.year == this.taxYear3){this.toggle.continueToggleYear3 = true; this.status.incompleteYear3 = true}
        if (this.dict[n].financialYear.year == this.taxYear4){this.toggle.continueToggleYear4 = true; this.status.incompleteYear4 = true}
        if (this.dict[n].financialYear.year == this.taxYear5){this.toggle.continueToggleYear5 = true; this.status.incompleteYear5 = true}
        if (this.dict[n].financialYear.year == this.taxYear6){this.toggle.continueToggleYear6 = true; this.status.incompleteYear6 = true}
        if (this.dict[n].financialYear.year == this.taxYear7){this.toggle.continueToggleYear7 = true; this.status.incompleteYear7 = true}
        if (this.dict[n].financialYear.year == this.taxYear8){this.toggle.continueToggleYear8 = true; this.status.incompleteYear8 = true}
      }   // incomplete 判断结束

      if (this.dict[n].lodgementStatus == 'Completed'){
        if(this.dict[n].financialYear.year == this.taxYear1){this.toggle.viewDetailsToggleYear1 = true; this.status.completedYear1 = true}
        if(this.dict[n].financialYear.year == this.taxYear2){this.toggle.viewDetailsToggleYear2 = true; this.status.completedYear2 = true}
        if(this.dict[n].financialYear.year == this.taxYear3){this.toggle.viewDetailsToggleYear3 = true; this.status.completedYear3 = true}
        if(this.dict[n].financialYear.year == this.taxYear4){this.toggle.viewDetailsToggleYear4 = true; this.status.completedYear4 = true}
        if(this.dict[n].financialYear.year == this.taxYear5){this.toggle.viewDetailsToggleYear5 = true; this.status.completedYear5 = true}
        if(this.dict[n].financialYear.year == this.taxYear6){this.toggle.viewDetailsToggleYear6 = true; this.status.completedYear6 = true}
        if(this.dict[n].financialYear.year == this.taxYear7){this.toggle.viewDetailsToggleYear7 = true; this.status.completedYear7 = true}
        if(this.dict[n].financialYear.year == this.taxYear8){this.toggle.viewDetailsToggleYear8 = true; this.status.completedYear8 = true}
      }   // completed 判断结束
    }
  }

  getEightYears(){
    this.localYear = new Date().getFullYear();
    this.localMonth = new Date().getMonth() + 1;
    this.localDate = new Date().getDate();
    console.log(this.localYear + '年' + this.localMonth + '月' + this.localDate + '日');

    if (this.localMonth >= 6){   // 七月一号开始为当年的报税年
      this.taxYear1 = this.localYear;
    }
    else{
      this.taxYear1 = this.localYear - 1;
    }
    console.log('当前的报税年为：' + this.taxYear1);
    this.taxYear2 = this.taxYear1 - 1;
    this.taxYear3 = this.taxYear2 - 1;
    this.taxYear4 = this.taxYear3 - 1;
    this.taxYear5 = this.taxYear4 - 1;
    this.taxYear6 = this.taxYear5 - 1;
    this.taxYear7 = this.taxYear6 - 1;
    this.taxYear8 = this.taxYear7 - 1;
    console.log('八年可报税年分别为: ' + this.taxYear1 + this.taxYear2 + this.taxYear3 +this.taxYear4
    + this.taxYear5 + this.taxYear6 + this.taxYear7 + this.taxYear8);
  }

  setNotStartedStatus(){
    this.status.notStartedYear2 = true; this.status.notStartedYear3 = true; this.status.notStartedYear4 = true; this.status.notStartedYear5 = true;
    this.status.notStartedYear6 = true; this.status.notStartedYear7 = true; this.status.notStartedYear8 = true;
  }

  sendVerifyEmail(){
    this.sendVerifyEmailService.sendEmail().subscribe(
      () =>{
        this.toastr.info('A verification has been sent to your email, please check your email.','Success')
      },
      (error) => {
        this.toastr.error(error, 'Error')
      }
    )
  }

  ngOnInit() {}
  getCurrentHour(){
    let tempHour = Number(this.currentHour);
    if (tempHour <= 12){
      return true
    }
  }

  addMainForm1(){
    this.model.financialYear = this.taxYear1.toString();
    this.addMainFormService.addMainForm(this.model).subscribe( (data) => {this.mainFormId = data['mainFormId']; sessionStorage.setItem('lian', this.taxYear1.toString())})
  }
  
  addMainForm2(){
    this.model.financialYear = this.taxYear2.toString();
    this.addMainFormService.addMainForm(this.model).subscribe( (data) => {this.mainFormId = data['mainFormId']; sessionStorage.setItem('lian', this.taxYear2.toString())})
  }

  addMainForm3(){
    this.model.financialYear = this.taxYear3.toString();
    this.addMainFormService.addMainForm(this.model).subscribe( (data) => {this.mainFormId = data['mainFormId']; sessionStorage.setItem('lian', this.taxYear3.toString())})
  }

  addMainForm4(){
    this.model.financialYear = this.taxYear4.toString();
    this.addMainFormService.addMainForm(this.model).subscribe( (data) => {this.mainFormId = data['mainFormId']; sessionStorage.setItem('lian', this.taxYear4.toString())})
  }

  addMainForm5(){
    this.model.financialYear = this.taxYear5.toString();
    this.addMainFormService.addMainForm(this.model).subscribe( (data) => {this.mainFormId = data['mainFormId']; sessionStorage.setItem('lian', this.taxYear5.toString())})
  }

  addMainForm6(){
    this.model.financialYear = this.taxYear6.toString();
    this.addMainFormService.addMainForm(this.model).subscribe( (data) => {this.mainFormId = data['mainFormId']; sessionStorage.setItem('lian', this.taxYear6.toString())})
  }

  addMainForm7(){
    this.model.financialYear = this.taxYear7.toString();
    this.addMainFormService.addMainForm(this.model).subscribe( (data) => {this.mainFormId = data['mainFormId']; sessionStorage.setItem('lian', this.taxYear7.toString())})
  }

  addMainForm8(){
    this.model.financialYear = this.taxYear8.toString();
    this.addMainFormService.addMainForm(this.model).subscribe( (data) => {this.mainFormId = data['mainFormId']; sessionStorage.setItem('lian', this.taxYear8.toString())})
  }

  addMainFormId(mainFormList: any){
    if (mainFormList.length != 0){
      for (let i = 0; i < mainFormList.length; i ++){
        this.passMainFormIdService.insertData(mainFormList[i].financialYear.year)
        this.passMainFormIdService.insertData(mainFormList[i].mainFormId)
      }
    }
  }

  setSessionYear(year: any){
    sessionStorage.setItem('lian', year)
  }


}