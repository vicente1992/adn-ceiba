import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from '@feature/loans/shared/models/loan';
import { LoanService } from '@feature/loans/shared/services/loan.service';

@Component({
  selector: 'app-pay-loan',
  templateUrl: './pay-loan.component.html',
  styleUrls: ['./pay-loan.component.scss']
})
export class PayLoanComponent implements OnInit {
  payForm: FormGroup = new FormGroup({});
  id: number;
  loan: Loan;
  constructor(
    private loanService: LoanService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.activatedRoute.params.subscribe(({ id }) => this.id = id);
    if (this.id) {
      this.getLoan(this.id);
    }
  }

  createPay() {
    const { amountQuota } = this.payForm.value;
    const { startDate, endDate, balance, totalPaid } = this.loan;

    if (amountQuota > balance) {
      throw new Error(`Valor a pagar debe ser menor o igual a ${balance}`);
    }

    const body = {
      ...this.payForm.value,
      balance: (balance - amountQuota),
      totalPaid: totalPaid + amountQuota,
      startDate,
      endDate
    };
    this.loanService.updateLoan(this.id, body).subscribe(() => this.goToLoans());
  }

  getLoan(id: number) {
    this.loanService.getLoan(id).subscribe((loan) => {
      this.loan = loan;
      this.payForm.patchValue(loan);
    });
  }

  goToLoans() {
    this.router.navigate(['/', 'loans']);
  }

  private initForm() {
    this.payForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      interests: new FormControl('', [Validators.required]),
      quotaNumber: new FormControl('', [Validators.required]),
      amountQuota: new FormControl(0, [Validators.required]),
    });
  }

}
