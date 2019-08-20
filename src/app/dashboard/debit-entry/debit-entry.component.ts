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
  constructor(private fb: FormBuilder, private debitService: DebitEntryService) { }

  ngOnInit() {
    this.initForm();
    this.debitService.getPlotNumbers().subscribe(val => {
      val.forEach((plot: any) => {
        console.log(plot.plotNumber);
        this.plotNumbers.push(plot.plotNumber);
        console.log(plot.membershipNumber);
        this.membershipNumbers.push(plot.membershipNumber);
      });
    });
  }
  initForm() {
    this.debitEntryForm = this.fb.group({
      plotNumber: [null, Validators.required],
      membershipNumber: [null, Validators.required]
    });
  }

}
