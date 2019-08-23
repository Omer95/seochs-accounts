import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditService } from './credit.service';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  creditForm: FormGroup;
  plotNumbers = [];
  membershipNumbers = [];
  selectedPlotNumber;
  selectedMembershipNumber;
  constructor(private fb: FormBuilder, private creditService: CreditService) { }

  ngOnInit() {
    this.initForm();
    this.creditService.getPlotNumbers().subscribe(val => {
      val.forEach((plot: any) => {
        console.log(plot.plotNumber);
        this.plotNumbers = [...this.plotNumbers, plot.plotNumber];
        console.log(plot.membershipNumber);
        this.membershipNumbers = [...this.membershipNumbers, plot.membershipNumber];
      });
    });
  }
  initForm() {
    this.creditForm = this.fb.group({
      creditAmount: [null, Validators.required],
      creditDesc: [null, Validators.required]
    });
  }
  submit() {
    const credit = {
      description: this.creditForm.get('creditDesc').value,
      creditAmount: this.creditForm.get('creditAmount').value,
      date: Date()
    }
    this.creditService.addCredit(credit, this.selectedPlotNumber, this.selectedMembershipNumber);
    this.creditForm.reset();
  }
}
