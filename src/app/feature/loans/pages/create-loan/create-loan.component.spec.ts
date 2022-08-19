import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { CustomerService } from '@feature/customers/shared/services/customer.service';
import { Loan } from '@feature/loans/shared/models/loan';
import { LoanService } from '@feature/loans/shared/services/loan.service';
import { of } from 'rxjs';

import { CreateLoanComponent } from './create-loan.component';

describe('CreateLoanComponent', () => {
  let component: CreateLoanComponent;
  let fixture: ComponentFixture<CreateLoanComponent>;
  let mockLoanService: LoanService;
  const dummyLoan: Loan = {
    id: 1,
    name: 'manuel',
    amount: 100000,
    interests: 10,
    quotaNumber: 10,
    startDate: '2022-03-24T20:03:50.534Z',
    endDate: '2022-03-24T20:03:50.534Z',
    TotalToPay: 110000,
    balance: 110000,
    amountQuota: 110000,
    totalPaid: 0
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLoanComponent],
      imports: [CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [LoanService, HttpService, CustomerService]
    })
      .compileComponents();
    mockLoanService = TestBed.inject(LoanService);
    spyOn(mockLoanService, 'createLoan').and.returnValue(of(dummyLoan));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form is invalid when empty', () => {
    expect(component.loanForm.valid).toBeFalsy();
  });


  it('I should create a loan and redirect', () => {

    expect(component.loanForm.valid).toBeFalsy();
    component.loanForm.controls.name.setValue('Manuel Ortiz');
    component.loanForm.controls.amount.setValue(100000);
    component.loanForm.controls.interests.setValue(10);
    component.loanForm.controls.quotaNumber.setValue(10);
    component.loanForm.controls.startDate.setValue('2022-08-02');
    component.loanForm.controls.endDate.setValue('2023-06-02');

    component.loanForm.addControl('balance', new FormControl(11000));
    component.loanForm.addControl('amountQuota', new FormControl(11000));
    component.loanForm.addControl('TotalToPay', new FormControl(11000));
    component.loanForm.addControl('totalPaid', new FormControl(0));
    expect(component.loanForm.valid).toBeTruthy();

    spyOn(component, 'goToLoans');

    component.createLoan();

    expect(mockLoanService.createLoan).toHaveBeenCalled();
    expect(component.goToLoans).toHaveBeenCalled();

  });

  it('Navigate to /loans page.', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.goToLoans();
    expect(spy.calls.first().args[0]).toEqual(['/', 'loans']);

  }));
});
