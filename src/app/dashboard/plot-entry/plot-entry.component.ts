import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Plot } from '../../models/plot.model';
import { Transfer } from '../../models/transfer.model';
import { PlotHolder } from 'src/app/models/plot-holder.model';

@Component({
  selector: 'app-plot-entry',
  templateUrl: './plot-entry.component.html',
  styleUrls: ['./plot-entry.component.css']
})
export class PlotEntryComponent implements OnInit {
  plotEntryForm: FormGroup;
  constructor(private fb: FormBuilder, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(): void {
    this.plotEntryForm = this.fb.group({
      plotNumber: [undefined, Validators.required],
      membershipNumber: [undefined, Validators.required],
      sharesNumber: [undefined, Validators.required],
      numberOfShares: [undefined, Validators.required],
      originalAllottee: this.fb.group({
        allotteeName: [undefined, Validators.required],
        allotteeRelations: [undefined, Validators.required],
        allotteeAddress: [undefined, Validators.required],
        allotteeOrganization: [undefined, Validators.required],
        allotteeHowAcquired: [undefined, Validators.required],
        allotteeSizeOfPlot: [undefined, Validators.required],
        allotteeCnic: [undefined, Validators.required]
      }),
      transfers: this.fb.array([]),
      presentPlotHolders: this.fb.array([]),
      remarks: [undefined, Validators.required]
    })
  }
  addTransfer(): void {
    if ((this.plotEntryForm.get('transfers') as FormArray).length < 3) {
      (this.plotEntryForm.get('transfers') as FormArray).push(new FormGroup({
        transfersName: new FormControl(),
        transfersOnAccount: new FormControl(),
        transfersRelation: new FormControl(),
        transfersDate: new FormControl()
      }));
    } else {
      console.log('cannot enter more than 3 plot transfers');
    }
  }
  addPresentPlotHolder(): void {
    (this.plotEntryForm.get('presentPlotHolders') as FormArray).push(new FormGroup({
      presentPlotHolder: new FormControl(),
      presentRelations: new FormControl(),
      presentAddress: new FormControl(),
      presentContactNumber: new FormControl(),
      presentOrganization: new FormControl(),
      presentHowAcquired: new FormControl(),
      presentCnic: new FormControl(),
      presentPossession: new FormControl(),
      presentDemarcation: new FormControl()
    }));
  }
  removePresentPlotHolder(index: number): void {
    (this.plotEntryForm.get('presentPlotHolders') as FormArray).removeAt(index);
  }
  removeTransfer(index: number): void {
    (this.plotEntryForm.get('transfers') as FormArray).removeAt(index);
  }
  submit(): void {
    console.log(this.plotEntryForm);
    const transfersList: Transfer[] = []; 
    for (let i = 0; i < (this.plotEntryForm.get('transfers') as FormArray).length; i++) {
      const transfer: Transfer = {
        transferTo: ((this.plotEntryForm.get('transfers') as FormArray).get(i.toString()) as FormGroup).get('transfersName').value,
        transferRelation: ((this.plotEntryForm.get('transfers') as FormArray).get(i.toString()) as FormGroup).get('transfersRelation').value,
        transferOnAccountOf: ((this.plotEntryForm.get('transfers') as FormArray).get(i.toString()) as FormGroup).get('transfersOnAccount').value,
        transferDate: ((this.plotEntryForm.get('transfers') as FormArray).get(i.toString()) as FormGroup).get('transfersDate').value, 
      }
      transfersList.push(transfer);
    }
    const plotHoldersList: PlotHolder[] = [];
    for (let i = 0; i < (this.plotEntryForm.get('presentPlotHolders') as FormArray).length; i++) {
      const plotHolder: PlotHolder = {
        name: ((this.plotEntryForm.get('presentPlotHolders') as FormArray).get(i.toString()) as FormGroup).get('presentPlotHolder').value,
        relation: ((this.plotEntryForm.get('presentPlotHolders') as FormArray).get(i.toString()) as FormGroup).get('presentRelations').value,
        address: ((this.plotEntryForm.get('presentPlotHolders') as FormArray).get(i.toString()) as FormGroup).get('presentAddress').value,
        contact: ((this.plotEntryForm.get('presentPlotHolders') as FormArray).get(i.toString()) as FormGroup).get('presentContactNumber').value,
        occupation: ((this.plotEntryForm.get('presentPlotHolders') as FormArray).get(i.toString()) as FormGroup).get('presentOrganization').value,
        howAcquired: ((this.plotEntryForm.get('presentPlotHolders') as FormArray).get(i.toString()) as FormGroup).get('presentHowAcquired').value,
        cnic: ((this.plotEntryForm.get('presentPlotHolders') as FormArray).get(i.toString()) as FormGroup).get('presentCnic').value,
        possession: ((this.plotEntryForm.get('presentPlotHolders') as FormArray).get(i.toString()) as FormGroup).get('presentPossession').value,
        demarcation: ((this.plotEntryForm.get('presentPlotHolders') as FormArray).get(i.toString()) as FormGroup).get('presentDemarcation').value
      }
      plotHoldersList.push(plotHolder);
    }
    const newPlot: Plot = {
      plotNumber: this.plotEntryForm.get('plotNumber').value,
      membershipNumber: this.plotEntryForm.get('membershipNumber').value,
      sharesNumber: this.plotEntryForm.get('sharesNumber').value,
      numberOfshares: this.plotEntryForm.get('numberOfShares').value,
      originalAllotteeName: (this.plotEntryForm.get('originalAllottee') as FormGroup).get('allotteeName').value,
      originalAllotteeRelation: (this.plotEntryForm.get('originalAllottee') as FormGroup).get('allotteeRelations').value,
      originalAllotteeAddress: (this.plotEntryForm.get('originalAllottee') as FormGroup).get('allotteeAddress').value,
      originalAllotteeOrganization: (this.plotEntryForm.get('originalAllottee') as FormGroup).get('allotteeOrganization').value,
      originalAllotteeHowAcquired: (this.plotEntryForm.get('originalAllottee') as FormGroup).get('allotteeHowAcquired').value,
      originalAllotteeSizeOfPlot: (this.plotEntryForm.get('originalAllottee') as FormGroup).get('allotteeSizeOfPlot').value,
      originalAllotteeCnic: (this.plotEntryForm.get('originalAllottee') as FormGroup).get('allotteeCnic').value,
      presentPlotHolders: plotHoldersList,
      remarks: this.plotEntryForm.get('remarks').value,
      transfers: transfersList
    }
    console.log(newPlot);
  }
}
