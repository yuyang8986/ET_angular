import { Routes } from '@angular/router';
import { MainFormComponent } from './main-form.component';
import { BasicDetailsComponent } from './Details/basic-details/basic-details.component';
import { UpdateDetailsComponent } from './Details/update-details/update-details.component';
import { MyIncomeComponent } from './Income/my-income/my-income.component';
import { IncomeDetailsComponent } from './Income/income-details/income-details.component';
import { DeductionTypesComponent } from './Deduction/deduction-types/deduction-types.component';
import { DeductionDetailsComponent } from './Deduction/deduction-details/deduction-details.component';

export const MainFormRoutes: Routes = [
    {
        path: 'mainForm',
        component: MainFormComponent,
        children: [
            {
                path: 'basicDetails',
                component: BasicDetailsComponent
            },
            {
                path: 'updateDetails',
                component: UpdateDetailsComponent
            },
            {
                path: 'myIncome',
                component: MyIncomeComponent
            },
            {
                path: 'incomeDetails',
                component: IncomeDetailsComponent
            },
            {
                path: 'deductionTypes',
                component: DeductionTypesComponent
            },
            {
                path: 'deductionDetails',
                component: DeductionDetailsComponent
            }
        ]
  }
]