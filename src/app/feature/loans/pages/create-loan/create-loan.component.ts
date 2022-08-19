import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '@feature/customers/shared/models/customer';
import { CustomerService } from '@feature/customers/shared/services/customer.service';
import { LoanService } from '@feature/loans/shared/services/loan.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.scss']
})
export class CreateLoanComponent implements OnInit {
  loanForm: FormGroup = new FormGroup({});
  public customers$: Observable<Customer[]>;

  constructor(
    private loanService: LoanService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllCustomers();
  }

  isInvalid(nameControl: string) {
    return this.loanForm.controls[nameControl].invalid
      && this.loanForm.controls[nameControl].touched;
  }

  getAllCustomers() {
    this.customers$ = this.customerService.getAllCustomers();
  }

  createLoan() {
    const { amount, interests, quotaNumber } = this.loanForm.value;
    const TotalToPay = this.loanService.calculatePay(amount, interests);

    const body = {
      ...this.loanForm.value,
      TotalToPay,
      balance: TotalToPay,
      amountQuota: TotalToPay / quotaNumber
    };

    this.loanService.createLoan(body).subscribe(() => this.goToLoans());
  }

  goToLoans() {
    this.router.navigate(['/', 'loans']);
  }

  selectDate(date: Date) {
    const { quotaNumber } = this.loanForm.value;
    if (!quotaNumber) {
      throw new Error('Por favor ingrese el número de cuotas');
    }
    const endDate = this.loanService.getEndDate(date, quotaNumber);
    this.loanForm.patchValue({ endDate });
  }

  private initForm() {
    this.loanForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      interests: new FormControl('', [Validators.required]),
      quotaNumber: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    });
  }



}
