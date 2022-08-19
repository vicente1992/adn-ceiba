import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

import { Loan } from '../models/loan';
import { SimulateLoan } from '../models/sumulateLoan';
import { LoanService } from './loan.service';

describe('LoanService', () => {
  let service: LoanService;
  let httpMock: HttpTestingController;
  const apiEndpointLoans = `${environment.endpoint}/loans`;
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

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoanService, HttpService],
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(LoanService);
  });

  it('should be created', () => {
    const loanService: LoanService = TestBed.inject(LoanService);
    expect(loanService).toBeTruthy();
  });


  it('I should list loans', () => {
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
        totalPaid: 0
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
        totalPaid: 0
      },
    ];

    service.getAllLoans()
      .subscribe((loans) => {
        expect(loans.length).toBe(2);
        expect(loans).toEqual(loansList);
      });

    const req = httpMock.expectOne(apiEndpointLoans);
    expect(req.request.method).toBe('GET');
    req.flush(loansList);
  });


  it('I should create a loan', () => {

    service.createLoan(dummyLoan)
      .subscribe((loan) => {
        expect(loan).toEqual(dummyLoan);
      });

    const req = httpMock.expectOne(apiEndpointLoans);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<Loan>({ body: req.request.body }));
  });

  it('I should  loan by his id', () => {
    const loanId = 1;
    service.getLoan(loanId)
      .subscribe((loan) => {
        expect(loan).toBe(dummyLoan);
        expect(loan).toEqual(dummyLoan);
      });

    const reqGetUser = httpMock.expectOne(`${apiEndpointLoans}/${loanId}`);
    expect(reqGetUser.request.method).toBe('GET');

  });

  it('I should update a loan', () => {

    service.updateLoan(dummyLoan.id, dummyLoan)
      .subscribe((loan) => {
        expect(loan).toEqual(dummyLoan);
      });
    const req = httpMock.expectOne(`${apiEndpointLoans}/${dummyLoan.id}`);
    expect(req.request.method).toBe('PATCH');
    req.event(new HttpResponse<Loan>({ body: req.request.body }));
  });

  it('I should delete a loan', () => {

    service.deleteLoan(dummyLoan).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointLoans}/${dummyLoan.id}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('I should calculate payment', () => {
    const amount = 100000;
    const interests = 10;

    spyOn(service, 'calculatePay');
    service.calculatePay(amount, interests);
    expect(service.calculatePay).toHaveBeenCalled();

  });
  it('I should calculate end date', () => {
    const startDate: Date = new Date();
    const quotaNumber = 10;

    spyOn(service, 'getEndDate');
    service.getEndDate(startDate, quotaNumber);
    expect(service.getEndDate).toHaveBeenCalled();

  });

  it('I should simulate loan', () => {
    const dummySimulateLoan: SimulateLoan = {
      startDate: new Date(),
      amount: 100000,
      interests: 10,
      quotaNumber: 10
    };

    spyOn(service, 'simulateLoan');
    service.simulateLoan(dummySimulateLoan);
    expect(service.simulateLoan).toHaveBeenCalled();

  });
});
