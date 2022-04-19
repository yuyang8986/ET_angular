import { FinancialYearInterface } from './financialYearInterface';

export interface Lodgement{
    lodgementStatus: string;
    individualId: number;
    mainFormId: number;
    financialYear: FinancialYearInterface;
}