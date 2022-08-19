import { Component, OnInit } from '@angular/core';
import { Loan } from '@feature/loans/shared/models/loan';
import { LoanService } from '@feature/loans/shared/services/loan.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  public loans$: Observable<Loan[]>;
  constructor(
    private loanService: LoanService
  ) { }

  ngOnInit(): void {
    this.getAllLoans();
  }

  getAllLoans() {
    this.loans$ = this.loanService.getAllLoans();
  }

}
