import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Loan } from '@feature/loans/shared/models/loan';
import { LoanService } from '@feature/loans/shared/services/loan.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss']
})
export class LoansListComponent {
  @Input() loans: Observable<Loan[]>;
  @Output() cbgetLoans = new EventEmitter<boolean>();

  constructor(private loanService: LoanService) { }

  deleteLoan(loan: Loan) {
    this.loanService.deleteLoan(loan).subscribe(() => this.getLoans());

  }

  getLoans() {
    this.cbgetLoans.emit(true);
  }

}
