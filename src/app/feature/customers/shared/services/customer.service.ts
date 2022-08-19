import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';

@Injectable()
export class CustomerService {
  URL: string = environment.endpoint;
  constructor(
    protected http: HttpService
  ) { }


  getAllCustomers() {
    return this.http.doGet<Customer[]>(`${this.URL}/customers`);
  }

  getCustomer(id: number) {
    return this.http.doGet<Customer>(`${this.URL}/customers/${id}`);
  }

  createCustomer(customer: Customer) {
    return this.http.doPost<Customer, boolean>(`${this.URL}/customers`, customer)
      .pipe(map((response: Customer | boolean) => response as Customer));
  }

  updateCustomer(id: number, customer: Customer) {
    return this.http.doPatch<Customer, boolean>(`${this.URL}/customers/${id}`, customer)
      .pipe(map((response: Customer | boolean) => response as Customer));

  }

  public deleteCustomer(customer: Customer) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/customers/${customer.id}`);
  }

}
