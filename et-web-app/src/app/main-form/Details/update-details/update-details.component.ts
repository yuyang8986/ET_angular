import { Component, OnInit } from '@angular/core';
import { GetIndividualByIdService } from '../../services/get-individual-by-id.service';
import { PutIndividualService } from './services/put-individual.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css'],
  providers: [GetIndividualByIdService,
  PutIndividualService]
})
export class UpdateDetailsComponent{
  personalInfor: any;
  occupationList: string[]=[];
  model: any = {};
  phoneNumberStatus: boolean;
  genderList: string[] = ['Male', 'Female', 'Others'];
  countryList: string[] = ['Australia', 'Others'];
  myValue = "";
  btnToggle: boolean = true;
  occupationArray: any = [];
  individualId: string = "";
  location: string = "";
  
  // autocomplete parameters
  selectedItem: any = {};
  inputChanged: any = '';

  modalText1: string = `You are going to fill the following 5 parts, Street, City, State, Post Code, and Country. The Address
    autocomplete part is optional that can help you autocomplete your address.`

  constructor(private getIndividualByIdService: GetIndividualByIdService, private toastr: ToastrService, 
    private putIndividualService: PutIndividualService, private router: Router) {
    this.individualId = sessionStorage.getItem('individualId').toString()
    this.getIndividualByIdService.getIndividual()
      .subscribe(
        (data: any) => {
          let date
          if (data['dateOfBirth'] && data['dateOfBirth']!= '0001-01-01T00:00:00') {
            date = data['dateOfBirth'].substr(0,10)
          }
          else if (data['dateOfBirth'] && data['dateOfBirth']=='0001-01-01T00:00:00'){
            date = '2018-12-26'
          }
          else{}

          let occupationName
          if (data['occupation'] && data['occupation']['name'] ) { occupationName = data['occupation']['name'] }
          else { occupationName = "" }

          this.model = {   // data is list which stores all data back
          firstName: data['firstName'],
          middleName: data['middleName'],
          lastName: data['lastName'],
          gender: data['gender'],
          dateOfBirth: date,                             // data['dateOfBirth'].substr(0,10)
          mobile: data['mobile'],
          homePhone: data['homePhone'],                   //data['homePhone'].substr(0,2) data['homePhone'].substr(2, data['homePhone'].length-2)
          email: data['email'],
          tfn: data['tfn'],
          occupation: occupationName,                                 // data['occupation']['name']
          homeAddressStreet: data['homeAddressStreet'],
          homeAddressCity:data['homeAddressCity'],
          homeAddressPostCode: data['homeAddressPostCode'],
          homeAddressState: data['homeAddressState'],
          homeAddressCountry: data['homeAddressCountry'],
          postalAddressStreet: data['postalAddressStreet'],
          postalAddressCity:data['postalAddressCity'],
          postalAddressPostCode: data['postalAddressPostCode'],
          postalAddressState: data['postalAddressState'],
          postalAddressCountry: data['postalAddressCountry']
        };
  }  
);


  this.getIndividualByIdService.getFullOccupation().subscribe(
    (data: any) => {
      for (let index=0; index<data.length; index++){
        this.occupationList.push(data[index])
      }
      console.log(this.occupationList.length+'个职业')

      for (let element = 0; element < this.occupationList.length; element++){
        let tempDist: any = {}
        tempDist.label = this.occupationList[element]
        this.occupationArray.push(tempDist)
      }
    }
  )

  }

  copyInfor(){
    this.model.postalAddressStreet = this.model.homeAddressStreet
    this.model.postalAddressState = this.model.homeAddressState
    this.model.postalAddressCity = this.model.homeAddressCity
    this.model.postalAddressCountry = this.model.homeAddressCountry
    this.model.postalAddressPostCode = this.model.homeAddressPostCode
    this.btnToggle = true
  }

  showMobileValidation(){
    let reg = /\d\d\d\d\d\d\d\d\d\d/
    if (reg.test(this.model.mobile) || !this.model.mobile){
      return true;
    }
    else{
      return false;
    }
  }
  
  showPhoneValidation(){
    let reg = /\d\d\d\d\d\d\d\d\d\d/;
    if (reg.test(this.model.homePhone) || !this.model.homePhone){
      return true;
    }
    else {
      return false;
    }
  }

  showEmailValidation(){
    let reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    if (reg.test(this.model.email)){
      return true;
    }
    else{
      return false;
    }
  }

  showTfnValidation(){
    let reg = /^\d{8,9}$/
    if (reg.test(this.model.tfn) || !this.model.tfn){
      return true;
    }
    else{
      return false;
    }
  }

  showAllValidation(){
    if (this.showMobileValidation() && this.showPhoneValidation() && this.showEmailValidation() && this.showTfnValidation()){
      return true;
    }
    else {
      return false;
    }
  }

  changeModel(){
    this.model.individualId = this.individualId;
  }

  submit(){
    this.changeModel();
    this.putIndividualService.updateIndividual(this.model).subscribe(() => {
      this.toastr.success('Upload successfully', 'Success');
      this.router.navigate(["/mainForm/basicDetails"]);   // Manually redirect to loginComponent
    }, error => {
      this.toastr.error(error, 'Error');
    });
  }

  showModel(){
    console.log(this.model)
  }

  changeBtnToggle(){
    this.btnToggle = false
  }

  onSelect(item: any) {
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  handleAddressChange(item: any){
    console.log(item)
    if (item.address_components.length == 7){
      this.model.homeAddressStreet = item.address_components[0].short_name + ',' + item.address_components[1].long_name
      this.model.homeAddressCity = item.address_components[2].long_name
      this.model.homeAddressState = item.address_components[4].long_name
      this.model.homeAddressPostCode = item.address_components[6].long_name
      this.model.homeAddressCountry = item.address_components[5].long_name
    }

    if (item.address_components.length == 5){
      this.model.homeAddressStreet = ''
      this.model.homeAddressCity = item.address_components[0].long_name
      this.model.homeAddressState = item.address_components[2].long_name
      this.model.homeAddressPostCode = item.address_components[4].long_name
      this.model.homeAddressCountry = item.address_components[3].long_name
    }
  }

  config2: any = {'placeholder': '', 'sourceField': ['label']};

  /*items2: any[] = [
    {label: 'Tom'},
    {label: 'John'},
    {label: 'Lisa'},
    {label: 'Js'},
    {label: 'Java'},
    {label: 'c'},
    {label: 'vc'}
  ];*/

}