import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoansComponent } from './pages/loans/loans.component';
import { LoansListComponent } from './components/loans-list/loans-list.component';
import { CreateLoanComponent } from './pages/create-loan/create-loan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PayLoanComponent } from './pages/pay-loan/pay-loan.component';
import { SimulateLoanComponent } from './pages/simulate-loan/simulate-loan.component';
import { LoanInformationComponent } from './components/loan-information/loan-information.component';
import { LoanService } from './shared/services/loan.service';
import { CustomerService } from '@feature/customers/shared/services/customer.service';


@NgModule({
  declarations: [
    LoansComponent,
    LoansListComponent,
    CreateLoanComponent,
    PayLoanComponent,
    SimulateLoanComponent,
    LoanInformationComponent
  ],
  imports: [
    CommonModule,
    LoansRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [LoanService, CustomerService]
})
export class LoansModule { }
