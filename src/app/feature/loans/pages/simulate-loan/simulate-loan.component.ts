import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Simulate } from '@feature/loans/shared/models/sumulateLoan';
import { LoanService } from '@feature/loans/shared/services/loan.service';

@Component({
  selector: 'app-simulate-loan',
  templateUrl: './simulate-loan.component.html',
  styleUrls: ['./simulate-loan.component.scss']
})
export class SimulateLoanComponent implements OnInit {
  simulateForm: FormGroup = new FormGroup({});
  simulateLoan: Simulate;

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.initForm();
  }

  isInvalid(nameControl: string) {
    return this.simulateForm.controls[nameControl].invalid && this.simulateForm.controls[nameControl].touched;
  }

  onSubmit() {
    this.simulateLoan = this.loanService.simulateLoan(this.simulateForm.value);
    this.simulateForm.reset();
  }

  private initForm() {
    this.simulateForm = new FormGroup({
      amount: new FormControl('', [Validators.required]),
      interests: new FormControl('', [Validators.required]),
      quotaNumber: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
    });
  }

}
