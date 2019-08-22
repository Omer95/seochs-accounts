import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DebitEntryService } from './debit-entry.service';

@Component({
  selector: 'app-debit-entry',
  templateUrl: './debit-entry.component.html',
  styleUrls: ['./debit-entry.component.css']
})
export class DebitEntryComponent implements OnInit {
  debitEntryForm: FormGroup;
  plotNumbers = [];
  membershipNumbers = [];
  selectedPlotNumber;
  selectedMembershipNumber;
  testArr = ['omer', 'ali', 'alam', 'ahmed'];
  constructor(private fb: FormBuilder, private debitService: DebitEntryService) { }

  ngOnInit() {
    this.initForm();
    this.debitService.getPlotNumbers().subscribe(val => {
      val.forEach((plot: any) => {
        console.log(plot.plotNumber);
        this.plotNumbers = [...this.plotNumbers, plot.plotNumber];
        console.log(plot.membershipNumber);
        this.membershipNumbers = [...this.membershipNumbers, plot.membershipNumber];
      });
    });
  }
  initForm() {
    this.debitEntryForm = this.fb.group({
      debitAmount: [null, Validators.required],
      debitDesc: [null, Validators.required]
    });
  }
  submit() {
    const debit = {
      description: this.debitEntryForm.get('debitDesc').value,
      debitAmount: this.debitEntryForm.get('debitAmount').value,
      date: Date()
    }
    this.debitService.addDebit(debit, this.selectedPlotNumber, this.selectedMembershipNumber);
    this.debitEntryForm.reset();
  }

}
