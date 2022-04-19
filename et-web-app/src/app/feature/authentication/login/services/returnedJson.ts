import { Lodgement } from '../../../../dashboard/interfaces/lodgementInterface'

export interface AccountInfor{
    firstName: string;
    lastName: string;
    individualId: number;
    iitrLodgements?: Lodgement[];
}