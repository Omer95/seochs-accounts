import { Transfer } from './transfer.model';

export class Plot {
    plotNumber: string;
    membershipNumber: string;
    sharesNumber: string;
    numberOfshares: string;
    originalAllotteeName: string;
    originalAllotteeRelation: string;
    originalAllotteeAddress: string;
    originalAllotteeOrganization: string;
    originalAllotteeHowAcquired: string;
    originalAllotteeSizeOfPlot: string;
    originalAllotteeCnic: string;
    presentPlotHolder: string;
    presentRelation: string;
    presentAddress: string;
    presentContactNumber: string;
    presentOrganization: string;
    presentHowAcquired: string;
    presentCnic: string;
    presentPossession: string;
    presentDemarcation: string;
    remarks: string;
    transfers: Transfer[];
}
