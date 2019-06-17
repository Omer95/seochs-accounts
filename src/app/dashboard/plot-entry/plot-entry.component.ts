import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms'; 

@Component({
  selector: 'app-plot-entry',
  templateUrl: './plot-entry.component.html',
  styleUrls: ['./plot-entry.component.css']
})
export class PlotEntryComponent implements OnInit {
  plotEntryForm: FormGroup;
  constructor(private fb: FormBuilder) { }

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
      presentRemarks: [undefined, Validators.required]
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
  }
}
