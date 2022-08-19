import { Component, Input } from '@angular/core';
import { Simulate } from '@feature/loans/shared/models/sumulateLoan';

@Component({
  selector: 'app-loan-information',
  templateUrl: './loan-information.component.html',
  styleUrls: ['./loan-information.component.scss']
})
export class LoanInformationComponent {
  @Input() simulateLoan: Simulate;

}
