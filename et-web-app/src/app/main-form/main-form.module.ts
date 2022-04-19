import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainFormRoutes } from './main-form.routing';
import { AuthenticationModule } from '../feature/authentication/authentication.module';
import { FormsModule } from '@angular/forms';
import { MainFormComponent } from './main-form.component';
import { BasicDetailsComponent } from './Details/basic-details/basic-details.component';
import { UpdateDetailsComponent } from './Details/update-details/update-details.component';
import { ReactiveFormsModule } from '@angular/forms'
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { MyIncomeComponent } from './Income/my-income/my-income.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { ModalComponent } from '../public/modal/modal.component';
import { ETFileUploadComponent } from '../public/etfile-upload/etfile-upload.component';
import { SubtitleComponent } from '../public/subtitle/subtitle.component';
import { IncomeDetailsComponent } from './Income/income-details/income-details.component';

import { Code1SalaryComponent } from './Income/income-details/type-details/code1-salary/code1-salary.component';
import { Code9BankInterestComponent } from './Income/income-details/type-details/code9-bank-interest/code9-bank-interest.component';
import { Code2AllowanceEarningsComponent } from './Income/income-details/type-details/code2-allowance-earnings/code2-allowance-earnings.component';
import { Code3EmployerLumpSumPaymentComponent } from './Income/income-details/type-details/code3-employer-lump-sum-payment/code3-employer-lump-sum-payment.component';
import { Code4EmploymentTerminationPaymentsComponent } from './Income/income-details/type-details/code4-employment-termination-payments/code4-employment-termination-payments.component';
import { Code5AustralianGovernmentAllowancesComponent } from './Income/income-details/type-details/code5-australian-government-allowances/code5-australian-government-allowances.component';
import { Code6AustralianAnnuitiesAndSuperannuationIncomeStreamsComponent } from './Income/income-details/type-details/code6-australian-annuities-and-superannuation-income-streams/code6-australian-annuities-and-superannuation-income-streams.component';
import { Code7AustralianSuperannuationLumpSumPaymentsComponent } from './Income/income-details/type-details/code7-australian-superannuation-lump-sum-payments/code7-australian-superannuation-lump-sum-payments.component';
import { Code8AttributedPersonalServicesIncomeComponent } from './Income/income-details/type-details/code8-attributed-personal-services-income/code8-attributed-personal-services-income.component';
import { Code10DividendsComponent } from './Income/income-details/type-details/code10-dividends/code10-dividends.component';
import { Code11EmployeeShareSchemesComponent } from './Income/income-details/type-details/code11-employee-share-schemes/code11-employee-share-schemes.component';
import { Code12PartnershipsAndTrustsComponent } from './Income/income-details/type-details/code12-partnerships-and-trusts/code12-partnerships-and-trusts.component';
import { Code24PersonalServicesIncomeComponent } from './Income/income-details/type-details/code24-personal-services-income/code24-personal-services-income.component';
import { DeductionTypesComponent } from './Deduction/deduction-types/deduction-types.component';
import { DeductionDetailsComponent } from './Deduction/deduction-details/deduction-details.component';
import { Code14NetIncomeOrLossFromBusinessComponent } from './Income/income-details/type-details/code14-net-income-or-loss-from-business/code14-net-income-or-loss-from-business.component';
import { Code15DeferredNonCommercialBusinessLossesComponent } from './Income/income-details/type-details/code15-deferred-non-commercial-business-losses/code15-deferred-non-commercial-business-losses.component';
import { Code16NetFarmManagementDepositsOrRepaymentsComponent } from './Income/income-details/type-details/code16-net-farm-management-deposits-or-repayments/code16-net-farm-management-deposits-or-repayments.component';
import { Code17CapitalGainsOrLossesComponent } from './Income/income-details/type-details/code17-capital-gains-or-losses/code17-capital-gains-or-losses.component';
import { Code18ForeignEntitiesComponent } from './Income/income-details/type-details/code18-foreign-entities/code18-foreign-entities.component';
import { Code19ForeignSourceIncomeComponent } from './Income/income-details/type-details/code19-foreign-source-income/code19-foreign-source-income.component';
import { Code20RentComponent } from './Income/income-details/type-details/code20-rent/code20-rent.component';
import { Code21BFLICAFSComponent } from './Income/income-details/type-details/code21-bflicafs/code21-bflicafs.component';
import { Code22ForestryManagedInvestmentSchemeIncomeComponent } from './Income/income-details/type-details/code22-forestry-managed-investment-scheme-income/code22-forestry-managed-investment-scheme-income.component';
import { Code23OtherIncomeComponent } from './Income/income-details/type-details/code23-other-income/code23-other-income.component';
import { Code25P2DescriptionOfMainBusinessComponent } from './Income/income-details/type-details/code25-p2-description-of-main-business/code25-p2-description-of-main-business.component';
import { Code26P3NumberOfBusinessActivitiesComponent } from './Income/income-details/type-details/code26-p3-number-of-business-activities/code26-p3-number-of-business-activities.component';
import { Code27P4StatusOfYourBusinessComponent } from './Income/income-details/type-details/code27-p4-status-of-your-business/code27-p4-status-of-your-business.component';
import { Code28P5BusinessNameOfMainBusinessComponent } from './Income/income-details/type-details/code28-p5-business-name-of-main-business/code28-p5-business-name-of-main-business.component';
import { Id1WorkRelatedCarExpensesComponent } from './Deduction/deduction-details/details/id1-work-related-car-expenses/id1-work-related-car-expenses.component';
import { Id3WorkRelatedTravelExpensesComponent } from './Deduction/deduction-details/details/id3-work-related-travel-expenses/id3-work-related-travel-expenses.component';
import { Id4WorkRelatedUniformOccupationComponent } from './Deduction/deduction-details/details/id4-work-related-uniform-occupation/id4-work-related-uniform-occupation.component';
import { Code29P6BusinessAddressOfMainBusinessComponent } from './Income/income-details/type-details/code29-p6-business-address-of-main-business/code29-p6-business-address-of-main-business.component';
import { Code30P7GoodsOrServicesByInterestComponent } from './Income/income-details/type-details/code30-p7-goods-or-services-by-interest/code30-p7-goods-or-services-by-interest.component';
import { Code31P8BusinessIncomeAndExpensesComponent } from './Income/income-details/type-details/code31-p8-business-income-and-expenses/code31-p8-business-income-and-expenses.component';
import { Code32P9BusinessLossActivityDetailsComponent } from './Income/income-details/type-details/code32-p9-business-loss-activity-details/code32-p9-business-loss-activity-details.component';
import { Code33P10SmallBusinessEntityDepreciatingAssetsComponent } from './Income/income-details/type-details/code33-p10-small-business-entity-depreciating-assets/code33-p10-small-business-entity-depreciating-assets.component';
import { Code34P11TradeDebtorsComponent } from './Income/income-details/type-details/code34-p11-trade-debtors/code34-p11-trade-debtors.component';
import { Code35P12TradeCreditorsComponent } from './Income/income-details/type-details/code35-p12-trade-creditors/code35-p12-trade-creditors.component';
import { Code36P13TotalSalaryAndWageExpensesComponent } from './Income/income-details/type-details/code36-p13-total-salary-and-wage-expenses/code36-p13-total-salary-and-wage-expenses.component';
import { Code37P14PaymentsToAssociatedPersonsComponent } from './Income/income-details/type-details/code37-p14-payments-to-associated-persons/code37-p14-payments-to-associated-persons.component';
import { Code38P15IntangibleDepreciatingAssetsFirstDeductedComponent } from './Income/income-details/type-details/code38-p15-intangible-depreciating-assets-first-deducted/code38-p15-intangible-depreciating-assets-first-deducted.component';
import { Code39P16OtherDepreciatingAssetsFirstDeductedComponent } from './Income/income-details/type-details/code39-p16-other-depreciating-assets-first-deducted/code39-p16-other-depreciating-assets-first-deducted.component';
import { Code40P17TerminationValueOfIntangibleDepreciatingAssetComponent } from './Income/income-details/type-details/code40-p17-termination-value-of-intangible-depreciating-asset/code40-p17-termination-value-of-intangible-depreciating-asset.component';
import { Code41P18TerminationValueOfOtherDepreciatingAssetsComponent } from './Income/income-details/type-details/code41-p18-termination-value-of-other-depreciating-assets/code41-p18-termination-value-of-other-depreciating-assets.component';
import { Code42P19TradingStockElectionComponent } from './Income/income-details/type-details/code42-p19-trading-stock-election/code42-p19-trading-stock-election.component';


export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    BasicDetailsComponent,
    UpdateDetailsComponent,
    MainFormComponent,
    MyIncomeComponent,
    ModalComponent,
    ETFileUploadComponent,
    SubtitleComponent,
    IncomeDetailsComponent,
    Code1SalaryComponent,
    Code9BankInterestComponent,
    Code2AllowanceEarningsComponent,
    Code3EmployerLumpSumPaymentComponent,
    Code4EmploymentTerminationPaymentsComponent,
    Code5AustralianGovernmentAllowancesComponent,
    Code6AustralianAnnuitiesAndSuperannuationIncomeStreamsComponent,
    Code7AustralianSuperannuationLumpSumPaymentsComponent,
    Code8AttributedPersonalServicesIncomeComponent,
    Code10DividendsComponent,
    Code11EmployeeShareSchemesComponent,
    Code12PartnershipsAndTrustsComponent,
    Code24PersonalServicesIncomeComponent,
    DeductionTypesComponent,
    DeductionDetailsComponent,
    Code14NetIncomeOrLossFromBusinessComponent,
    Code15DeferredNonCommercialBusinessLossesComponent,
    Code16NetFarmManagementDepositsOrRepaymentsComponent,
    Code17CapitalGainsOrLossesComponent,
    Code18ForeignEntitiesComponent,
    Code19ForeignSourceIncomeComponent,
    Code20RentComponent,
    Code21BFLICAFSComponent,
    Code22ForestryManagedInvestmentSchemeIncomeComponent,
    Code23OtherIncomeComponent,
    Code25P2DescriptionOfMainBusinessComponent,
    Code26P3NumberOfBusinessActivitiesComponent,
    Code27P4StatusOfYourBusinessComponent,
    Code28P5BusinessNameOfMainBusinessComponent,
    Id1WorkRelatedCarExpensesComponent,
    Id3WorkRelatedTravelExpensesComponent,
    Id4WorkRelatedUniformOccupationComponent,
    Code29P6BusinessAddressOfMainBusinessComponent,
    Code30P7GoodsOrServicesByInterestComponent,
    Code31P8BusinessIncomeAndExpensesComponent,
    Code32P9BusinessLossActivityDetailsComponent,
    Code33P10SmallBusinessEntityDepreciatingAssetsComponent,
    Code34P11TradeDebtorsComponent,
    Code35P12TradeCreditorsComponent,
    Code36P13TotalSalaryAndWageExpensesComponent,
    Code37P14PaymentsToAssociatedPersonsComponent,
    Code38P15IntangibleDepreciatingAssetsFirstDeductedComponent,
    Code39P16OtherDepreciatingAssetsFirstDeductedComponent,
    Code40P17TerminationValueOfIntangibleDepreciatingAssetComponent,
    Code41P18TerminationValueOfOtherDepreciatingAssetsComponent,
    Code42P19TradingStockElectionComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    FormsModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    RouterModule.forChild(MainFormRoutes),
    AutocompleteModule.forRoot()
  ],
  exports: [
    MainFormComponent,
    BasicDetailsComponent,
    UpdateDetailsComponent]
})
export class MainFormModule {
  
}
