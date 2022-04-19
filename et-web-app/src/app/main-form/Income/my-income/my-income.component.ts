import { Component, OnInit } from '@angular/core';
import { RequestIncomeTypeService } from './services/request-income-type.service';
import { CommonRequestService } from '../../../public/services/common-request.service';
import { GetMainFormService } from '../../../public/services/get-main-form.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-income',
  templateUrl: './my-income.component.html',
  styleUrls: ['./my-income.component.css'],
  providers: [RequestIncomeTypeService, CommonRequestService, GetMainFormService]
})
export class MyIncomeComponent implements OnInit {
  incomeType: any = [];
  lastTaxYear: string = "";
  nowTaxYear: string = "";
  mainFormId: string = "";
  incomeId: string = "";
  yearModel: any = {};   // store year as an object
  model: any = {};
  btnName1: string = "more";

  tenCommonTypes: any = [];    // 默认显示的对象
  twoTypes: any = [{description:"Business Details", checked: false, incomeTypeId: "xx"},
    {description: "Detailed Business Sections", checked: false, incomeTypeId: "xy"}];        // 两种集合列表
  cloneIncomeType: any = [];      // 剩下的p9＋其他 就是 cloneIncomeType

  businessDetailsTypes: any = [];     // p1-p8
  detailedBusinessTypes: any = [];     // p10-p19
  //cloneIncomeType

  requestMethod: string = "";
  putTypeIdModel: any = {};
  postTypeIdModel: any = {};

  constructor(private requestIncomeType: RequestIncomeTypeService, private commonRequest: CommonRequestService,
    private getMainForm: GetMainFormService, private router: Router, private toastr: ToastrService) {

    this.lastTaxYear = sessionStorage.getItem('lian').toString()
    this.nowTaxYear = (Number(sessionStorage.getItem('lian')) + 1).toString()
    this.yearModel.year = this.lastTaxYear

    this.requestIncomeType.getAllIncomeType().subscribe((data) => {
      this.incomeType = data['incomeTypes']
      this.cloneIncomeType = this.incomeType
      this.addAttribute(this.incomeType)      // add attribute false to all data for
      this.splitIncomeType(data['incomeTypes'])

    })

    this.commonRequest.getTwoIds().subscribe((data) => {
      this.mainFormId = data['mainFormId']
      this.getMainForm.getMainForm(data['mainFormId']).subscribe((infor) => {
        if (infor['incomeTypeForm']){
          this.requestMethod = "put"
 
          this.incomeId = infor['incomeTypeForm']['id']
          this.putTypeIdModel.mainFormId = this.mainFormId  // 加mainFormId属性
          this.putTypeIdModel.incomeTypeIds = []

          this.bindFromSource(infor['incomeTypeForm']['incomeTypeIncomeTypeForms'])

        }
        if (!infor['incomeTypeForm']){
          this.requestMethod = "post"

          this.postTypeIdModel.mainFormId = this.mainFormId  // 加mainForm属性
          this.postTypeIdModel.incomeTypeIds = []

        }

      })
    })

  }

  ngOnInit() {
  }

  showModel(){
    console.log(this.incomeType)
    console.log('mainFormId: ' + this.mainFormId)
    console.log('income:' + this.incomeId)
    console.log('方法是 ' + this.requestMethod)
    //for (let x = 0; x< this.tenCommonTypes.length; x++){
    //  console.log('10个常用种类是' + this.tenCommonTypes[x]['checked'])
    //}
    console.log(this.tenCommonTypes)
    console.log(this.businessDetailsTypes)
    console.log(this.detailedBusinessTypes)
    console.log(this.cloneIncomeType)
    console.log(this.twoTypes)
   
  }

  splitIncomeType(modelList: any){                // 处理元数据，生成三个用于循环的列表, 最早调用
    let commonIdList = [1, 2, 3 ,4 ,5, 6, 7, 8, 9, 10, 20]   // store 11 most common typeId
    let businessDetailsList = ["P1","P2","P3","P4","P5","P6","P7","P8"]    //  store 8 businessDetails
    let detailedBusinessList = ["P10","P11","P12","P13","P14","P15","P16","P17","P18","P19"]
    

    for (let i = 0; i < modelList.length; i++){                  // 11 common
      for (let y = 0; y < commonIdList.length; y++){
        if (modelList[i].incomeTypeId == commonIdList[y].toString()){
          this.tenCommonTypes.push(modelList[i])
          this.cloneIncomeType.splice(i,1)
        }
      }
    }
 
    for (let i =0; i<modelList.length; i++){                   
      for (let y=0; y<businessDetailsList.length; y++){
        if (modelList[i].code == businessDetailsList[y]){      // p1-p8
          this.businessDetailsTypes.push(modelList[i])
          this.cloneIncomeType.splice(i,1)
        }
      }
    }

    for (let i=0; i<modelList.length; i++){
      for (let y=0; y<detailedBusinessList.length; y++){
        if (modelList[i].code == detailedBusinessList[y]){      // p10-p19
          this.detailedBusinessTypes.push(modelList[i])
          this.cloneIncomeType.splice(i,1)
        }
      }
    }

    
  }

  buildTypeIdModel(model: any){                 // 构建传值对象 ！！！！！！！！！！！！！！！！生成最终发送的两个model
    for (let i = 0; i < this.tenCommonTypes.length; i++){            
      if (this.tenCommonTypes[i].checked == true){                        // 11 common types
        model.incomeTypeIds.push(this.tenCommonTypes[i]['incomeTypeId'])
      }
    }

    for (let i =0; i< this.cloneIncomeType.length; i++){
      if (this.cloneIncomeType[i].checked == true){
        model.incomeTypeIds.push(this.cloneIncomeType[i]['incomeTypeId'])
      }
    }

    if (this.twoTypes[0].checked==true){   // p1-p8
      console.log(0)
      for (let i = 0; i<this.businessDetailsTypes.length; i++){
        model.incomeTypeIds.push(this.businessDetailsTypes[i]['incomeTypeId'])
      }
    }
    if (this.twoTypes[1].checked==true){  // p10-p19
      console.log(1)
      for (let i=0; i<this.detailedBusinessTypes.length; i++){
        model.incomeTypeIds.push(this.detailedBusinessTypes[i]['incomeTypeId'])
      }
    }

  }

  onClick(){
    if (this.btnName1 == "more"){
      this.btnName1 = "less"

    }
    else {
      this.btnName1 = "more"
    }

    $("#hiddenDiv1").slideToggle();
  }

  addAttribute(model: any){         // add Boolean attribute to 3 lists for binding
    for (let i = 0; i < model.length; i++){
      model[i].checked = false
    }
  }

  bindFromSource(model: any){          // bind incometype from getmainformbyid to dom view
    for (let i = 0; i < model.length; i++){     // 11 common types
      for (let y = 0; y < this.tenCommonTypes.length; y++){
        if (model[i]['incomeType']['code'] == this.tenCommonTypes[y]['code']){
          this.tenCommonTypes[y].checked = true
        }
      }
    }

    for (let i = 0; i < model.length; i++){     // Other types: clone incometypes
      for (let y = 0; y < this.cloneIncomeType.length; y++){
        if (model[i]['incomeType']['code'] == this.cloneIncomeType[y]['code']){
          this.cloneIncomeType[y].checked = true
        }
      }
    }

    for (let i = 0; i < model.length; i++){         // p1 - p8
      for (let y = 0; y < this.businessDetailsTypes.length; y++){
        if (model[i]['incomeType']['code'] == this.businessDetailsTypes[y]['code']){
          this.twoTypes[0].checked = true
        }
      }
    }

    for (let i = 0; i < model.length; i++){         // p10 - p19
      for (let y = 0; y < this.detailedBusinessTypes.length; y++){
        if (model[i]['incomeType']['code'] == this.detailedBusinessTypes[y]['code']){
          this.twoTypes[1].checked = true
        }
      }
    }

  }

  onSubmit(){
    if (this.requestMethod == "put"){
      this.buildTypeIdModel(this.putTypeIdModel)   // 加incomeTypeIds属性
      console.log(this.putTypeIdModel)
      this.requestIncomeType.putIncomeType(this.putTypeIdModel).subscribe(()=>{
      this.putTypeIdModel.incomeTypeIds = []
      console.log(this.putTypeIdModel)
        this.toastr.success('Upload successfully', 'Success')
        this.router.navigate(['/mainForm/incomeDetails'])
      }, (error) => this.toastr.error(error, 'Error'))
    }
    if (this.requestMethod == "post"){
      this.buildTypeIdModel(this.postTypeIdModel)    // 加incomeTypeIds属性
      console.log(this.postTypeIdModel)
      this.requestIncomeType.postIncomeType(this.postTypeIdModel).subscribe(()=>{
      this.postTypeIdModel.incomeTypeIds = []
      //console.log(this.postTypeIdModel)
        this.toastr.success('Upload successfully', 'Success')
        this.router.navigate(['/mainForm/incomeDetails'])
      }, (error) => this.toastr.error(error,'Error'))
    }
  }
  
}
