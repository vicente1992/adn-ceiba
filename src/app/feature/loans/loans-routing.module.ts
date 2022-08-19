import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLoanComponent } from './pages/create-loan/create-loan.component';
import { LoansComponent } from './pages/loans/loans.component';
import { PayLoanComponent } from './pages/pay-loan/pay-loan.component';
import { SimulateLoanComponent } from './pages/simulate-loan/simulate-loan.component';


const routes: Routes = [
  {
    path: '',
    component: LoansComponent
  },
  {
    path: 'create',
    component: CreateLoanComponent
  },
  {
    path: 'simulate',
    component: SimulateLoanComponent
  },
  {
    path: 'pay/:id',
    component: PayLoanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoansRoutingModule { }
