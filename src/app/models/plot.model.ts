import { Transfer } from './transfer.model';
import { PlotHolder } from './plot-holder.model';

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
    presentPlotHolders: PlotHolder[];
    remarks: string;
    transfers: Transfer[];
}
