import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Loan } from '@feature/loans/shared/models/loan';
import { LoanService } from '@feature/loans/shared/services/loan.service';
import { of } from 'rxjs';

import { PayLoanComponent } from './pay-loan.component';

describe('PayLoanComponent', () => {
  let component: PayLoanComponent;
  let fixture: ComponentFixture<PayLoanComponent>;
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
      declarations: [PayLoanComponent],
      imports: [CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [LoanService, HttpService,
      ]
    })
      .compileComponents();
    mockLoanService = TestBed.inject(LoanService);
    spyOn(mockLoanService, 'updateLoan').and.returnValue(of(dummyLoan));
    spyOn(mockLoanService, 'getLoan').and.returnValue(of(dummyLoan));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayLoanComponent);
    component = fixture.componentInstance;
    component.loan = dummyLoan;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('I should id loan', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const loanId = 1;
    component.id = loanId;

    expect(component.id).toBeTruthy();
  });


  it('I should get one loan', () => {
    const loanId = 1;
    component.getLoan(loanId);

    expect(mockLoanService.getLoan).toHaveBeenCalled();
    expect(component.loan).toEqual(dummyLoan);
  });


  it('I should create a pay and redirect', () => {
    const { startDate, endDate } = component.loan;
    expect(component.payForm.valid).toBeFalsy();
    component.payForm.controls.name.setValue('Manuel Ortiz');
    component.payForm.controls.amount.setValue(100000);
    component.payForm.controls.interests.setValue(10);
    component.payForm.controls.quotaNumber.setValue(10);
    component.payForm.controls.amountQuota.setValue(11000);
    component.payForm.addControl('startDate', new FormControl(startDate));
    component.payForm.addControl('endDate', new FormControl(endDate));
    component.payForm.addControl('TotalToPay', new FormControl(11000));
    component.payForm.addControl('balance', new FormControl(11000));
    component.payForm.addControl('totalPaid', new FormControl(0));
    expect(component.payForm.valid).toBeTruthy();

    spyOn(component, 'goToLoans');
    component.createPay();

    expect(mockLoanService.updateLoan).toHaveBeenCalled();
    expect(component.goToLoans).toHaveBeenCalled();

  });


  it('Navigate to /loans page.', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.goToLoans();
    expect(spy.calls.first().args[0]).toEqual(['/', 'loans']);

  }));


});
