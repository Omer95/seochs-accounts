import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Plot } from '../../models/plot.model';
import { Transfer } from '../../models/transfer.model';

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
      presentStatus: this.fb.group({
        presentPlotHolder: [undefined, Validators.required],
        presentRelations: [undefined, Validators.required],
        presentAddress: [undefined, Validators.required],
        presentContactNumber: [undefined, Validators.required],
        presentOrganization: [undefined, Validators.required],
        presentHowAcquired: [undefined, Validators.required],
        presentCnic: [undefined, Validators.required],
        presentPossession: [undefined, Validators.required],
        presentDemarcation: [undefined, Validators.required]
      }),
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
      presentPlotHolder: (this.plotEntryForm.get('presentStatus') as FormGroup).get('presentPlotHolder').value,
      presentRelation: (this.plotEntryForm.get('presentStatus') as FormGroup).get('presentRelations').value,
      presentAddress: (this.plotEntryForm.get('presentStatus') as FormGroup).get('presentAddress').value,
      presentContactNumber: (this.plotEntryForm.get('presentStatus') as FormGroup).get('presentContactNumber').value,
      presentOrganization: (this.plotEntryForm.get('presentStatus') as FormGroup).get('presentOrganization').value,
      presentHowAcquired: (this.plotEntryForm.get('presentStatus') as FormGroup).get('presentHowAcquired').value,
      presentCnic: (this.plotEntryForm.get('presentStatus') as FormGroup).get('presentCnic').value,
      presentDemarcation: (this.plotEntryForm.get('presentStatus') as FormGroup).get('presentDemarcation').value,
      presentPossession: (this.plotEntryForm.get('presentStatus') as FormGroup).get('presentPossession').value,
      remarks: this.plotEntryForm.get('remarks').value,
      transfers: transfersList
    }
    console.log(newPlot);
  }
}
