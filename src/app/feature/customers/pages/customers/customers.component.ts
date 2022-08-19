import { Component, OnInit } from '@angular/core';
import { Customer } from '@feature/customers/shared/models/customer';
import { CustomerService } from '@feature/customers/shared/services/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public customers$: Observable<Customer[]>;
  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customers$ = this.customerService.getAllCustomers();
  }

}
