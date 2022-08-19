import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from '@feature/customers/shared/models/customer';
import { CustomerService } from '@feature/customers/shared/services/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  @Output() cbgetCustomer = new EventEmitter<boolean>();
  @Input() customers: Observable<Customer[]>;

  constructor(
    private customerService: CustomerService
  ) { }

  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer).subscribe(() => this.getCustomers());
  }

  getCustomers() {
    this.cbgetCustomer.emit(true);
  }

}
