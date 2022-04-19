import { Component, OnInit } from '@angular/core';
import { GetIndividualByIdService } from '../../services/get-individual-by-id.service';
import { CommonRequestService } from '../../../public/services/common-request.service';
import { GetMainFormService } from '../../../public/services/get-main-form.service';
import * as $ from 'jquery';
import { DeductionService } from './services/deduction.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deduction-types',
  templateUrl: './deduction-types.component.html',
  styleUrls: ['./deduction-types.component.css']
})
export class DeductionTypesComponent implements OnInit {
  btnName1: string = "more";
  occupationId: string = "";     // Used to call Get Occupation By Id to show the basic binding
  emptyModel: any = {};      // Used for send to get all deduction types

  defaultModel: any = [];        // Default deductions shown on the top
  totalModel: any = [];          // All 24 deductionTypes
  restModel: any = [];          // Rest deductions

  requestMethod: string = "";
  putModel: any = {};
  postModel: any = {};
  mainFormId: string = "";
  deductionId: string = "";

  constructor(private getIndividualService: GetIndividualByIdService, private commonRequest: CommonRequestService, 
    private getMainFormService: GetMainFormService, private deductionService: DeductionService, private router: Router, 
    private toastr: ToastrService) {

      this.getIndividualService.getIndividual().subscribe((data) => {
        this.occupationId = data['occupation']['occupationId'];
        this.deductionService.getOccupationById(this.occupationId).subscribe((infor) => {
          this.addDefaultModel(infor['occupationCategory']['occupationCategoryDeductionTypes'], this.defaultModel);
          // this.addTrue(this.defaultModel);
          this.addChecked(this.defaultModel);
          this.deductionService.getAllDeductionTypes(this.emptyModel).subscribe((data) => {
            this.addRestModel(data['deductionTypes'], this.totalModel)
            this.addRestModel(data['deductionTypes'], this.restModel)
            this.spliceModel(this.defaultModel, this.restModel)
            this.addChecked(this.restModel)
            // 显示restModel里的选中栏 还有defaultmodel里的
            this.commonRequest.getTwoIds().subscribe((msg1) => {
              this.getMainFormService.getMainForm(msg1['mainFormId']).subscribe((msg2) => {
                if (msg2['deductionTypeForm']){
                  for (let i = 0; i < this.restModel.length; i++){
                    for (let j = 0; j < msg2['deductionTypeForm']['deductionTypeDeductionTypeForms'].length; j++){
                      if (this.restModel[i]['deductionTypeId'] == msg2['deductionTypeForm']['deductionTypeDeductionTypeForms'][j]['deductionTypeId']){
                        this.restModel[i].checked = true
                      }
                    }
                  }

                  for (let i = 0; i < this.defaultModel.length; i++){
                    for (let j = 0; j < msg2['deductionTypeForm']['deductionTypeDeductionTypeForms'].length; j++){
                      if (this.defaultModel[i]['deductionTypeId'] == msg2['deductionTypeForm']['deductionTypeDeductionTypeForms'][j]['deductionTypeId']){
                        this.defaultModel[i].checked = true
                      }
                    }
                  }
                }
              })

            })

          })

        })
      })

      this.commonRequest.getTwoIds().subscribe((data) => {
        this.mainFormId = data['mainFormId'];
        this.getMainFormService.getMainForm(data['mainFormId']).subscribe((data) => {
          if (data['deductionTypeForm']){
            this.requestMethod = "put";
            this.deductionId = data['deductionTypeForm']['id'];
          }
          if (!data['deductionTypeForm']){
            this.requestMethod = "post";
          }
        })
      })
      

    }

  ngOnInit() {
  }

  // 将 occupation get by ID里的 occupationcategorydeductiontype里的对象转移至 defaultModel 里
  addDefaultModel(sourceModel: any, targetModel: any){   
    for (let i = 0; i < sourceModel.length; i++){
      targetModel.push(sourceModel[i]['deductionType'])
    }
  }

  // 将 get all deductiontypes 里的deductionType里的对象转移至totalModel里
  addRestModel(sourceModel: any, targetModel: any){
    for (let i = 0; i < sourceModel.length; i++){
      targetModel.push(sourceModel[i])
    }
  }

   ///////// Add false property for rest
  addChecked(model: any){
    for (let i = 0; i < model.length; i++){
      model[i].checked = false;        
    }
  }

  ///////// Add true property for default
  addTrue(model: any){
    for (let i = 0; i < model.length; i++){
      model[i].checked = true;         
    }
  }

  showModel(){
    console.log('default model is:');
    console.log(this.defaultModel);
    console.log('Total model is:');
    console.log(this.totalModel)
    console.log('rest model is:');
    console.log(this.restModel);
    console.log('deductionId:'+this.deductionId);
    console.log('mainformId:'+this.mainFormId);
    console.log(this.requestMethod);
    console.log('occupationid'+this.occupationId)
  }

  // 将默认显示的model从24个totalModel里剔除
  spliceModel(smallModel: any, bigModel: any){
    for (let i=0; i<smallModel.length; i++){
      for (let j=0; j<bigModel.length; j++){
        if (smallModel[i].deductionTypeId==bigModel[j].deductionTypeId){
          bigModel.splice(j,1)
        }
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

    $("#hiddenWrapper").slideToggle();
  }

  onSubmit(){
    // build tow models
    this.putModel.deductionTypeIds = [];
    this.postModel.deductionTypeIds = [];

    for (let i = 0; i < this.defaultModel.length; i++){
      if (this.defaultModel[i].checked == true){
        this.putModel.deductionTypeIds.push(this.defaultModel[i]['deductionTypeId']);
        this.postModel.deductionTypeIds.push(this.defaultModel[i]['deductionTypeId']);
      }
    }

    for (let i = 0; i < this.restModel.length; i++){
      if (this.restModel[i].checked == true){
        this.putModel.deductionTypeIds.push(this.restModel[i]['deductionTypeId']);
        this.postModel.deductionTypeIds.push(this.restModel[i]['deductionTypeId']);
      }
    }

    if (this.requestMethod == "post"){
      this.postModel.mainFormId = this.mainFormId;
      this.deductionService.postDeduction(this.postModel).subscribe(() => {
        this.toastr.success('Upload successfully', 'Success');
        this.router.navigate(['/mainForm/deductionDetails'])
      }, (error) => {
        this.toastr.error(error, 'Error');
      })
    }

    if (this.requestMethod == "put"){
      this.putModel.mainFormId = this.mainFormId;
      this.deductionService.putDeduction(this.putModel).subscribe(() => {
        this.toastr.success('Upload successfully', 'Success')
        this.router.navigate(['./mainForm/deductionDetails'])
      }, (error) => {
        this.toastr.error(error, 'Error');
      })
    }

    console.log(this.putModel);
    console.log(this.postModel);
  }

}
