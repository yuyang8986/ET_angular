import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetIndividualByIdService } from './services/get-individual-by-id.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
  providers: [GetIndividualByIdService]
})
export class MainFormComponent{
  constructor(private router: Router) {
  }
}
