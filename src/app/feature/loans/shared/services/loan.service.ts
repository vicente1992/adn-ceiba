import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Loan } from '../models/loan';
import { Simulate, SimulateLoan } from '../models/sumulateLoan';
import * as moment from 'moment';

@Injectable()
export class LoanService {

  URL: string = environment.endpoint;

  constructor(
    protected http: HttpService
  ) { }


  getAllLoans() {
    return this.http.doGet<Loan[]>(`${this.URL}/loans`);
  }

  getLoan(id: number) {
    return this.http.doGet<Loan>(`${this.URL}/loans/${id}`);
  }

  createLoan(loan: Loan) {
    return this.http.doPost<Loan, boolean>(`${this.URL}/loans`, loan)
      .pipe(map((response: Loan | boolean) => response as Loan));
  }

  updateLoan(id: number, loan: Loan) {
    return this.http.doPatch<Loan, boolean>(`${this.URL}/loans/${id}`, loan)
      .pipe(map((response: Loan | boolean) => response as Loan));

  }

  public deleteLoan(loan: Loan) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/loans/${loan.id}`);
  }

  getEndDate(date: Date, quotaNumber: number) {
    return moment(date).add(quotaNumber, 'M').format('YYYY-MM-DD');
  }

  calculatePay(amount: number, interests: number): number {
    const percentage = 100;
    const amounInterests = amount * (interests / percentage);
    return amounInterests + amount;
  }

  simulateLoan(simulateLoan: SimulateLoan): Simulate {
    const { amount, interests, quotaNumber, startDate } = simulateLoan;
    const percentage = 100;
    const amounInterests = amount * (interests / percentage);
    const amountTotal = amount + amounInterests;
    const amountQuota = amountTotal / quotaNumber;

    return {
      amount,
      amountTotal,
      amountQuota,
      quotaNumber,
      interests,
      endDate: this.getEndDate(startDate, quotaNumber)
    };
  }
}
