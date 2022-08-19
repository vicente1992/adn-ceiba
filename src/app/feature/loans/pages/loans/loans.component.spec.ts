import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { LoansListComponent } from '@feature/loans/components/loans-list/loans-list.component';
import { Loan } from '@feature/loans/shared/models/loan';
import { LoanService } from '@feature/loans/shared/services/loan.service';
import { of } from 'rxjs';

import { LoansComponent } from './loans.component';

describe('LoansComponent', () => {
  let component: LoansComponent;
  let fixture: ComponentFixture<LoansComponent>;
  let loanService: LoanService;
  const loansList: Loan[] = [
    {
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
      totalPaid: 0,
    },
    {
      id: 2,
      name: 'manuel',
      amount: 100000,
      interests: 10,
      quotaNumber: 10,
      startDate: '2022-03-24T20:03:50.534Z',
      endDate: '2022-03-24T20:03:50.534Z',
      TotalToPay: 110000,
      balance: 110000,
      amountQuota: 110000,
      totalPaid: 0,
    },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoansComponent, LoansListComponent],
      imports: [CommonModule,
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [LoanService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansComponent);
    component = fixture.componentInstance;
    loanService = TestBed.inject(LoanService);
    spyOn(loanService, 'getAllLoans').and.returnValue(
      of(loansList)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.loans$.subscribe(result => {
      expect(2).toBe(result.length);
    });
  });
});
