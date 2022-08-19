import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Loan } from '@feature/loans/shared/models/loan';
import { LoanService } from '@feature/loans/shared/services/loan.service';
import { of } from 'rxjs';

import { LoansListComponent } from './loans-list.component';

describe('LoansListComponent', () => {
  let component: LoansListComponent;
  let fixture: ComponentFixture<LoansListComponent>;
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
      declarations: [LoansListComponent],
      imports: [CommonModule,
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [LoanService, HttpService]
    })
      .compileComponents();
    mockLoanService = TestBed.inject(LoanService);
    spyOn(mockLoanService, 'deleteLoan').and.returnValue(of(true));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('I should delete loan', () => {

    spyOn(component, 'getLoans');
    component.deleteLoan(dummyLoan);

    expect(mockLoanService.deleteLoan).toHaveBeenCalled();
    expect(component.getLoans).toHaveBeenCalled();
  });

  it('raises the selected event when clicked', () => {
    component.cbgetLoans.subscribe((getLoans: boolean) => expect(getLoans).toBeTruthy());
    component.getLoans();
  });
});
