import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';

import { CustomersComponent } from './pages/customers/customers.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { UpdateCustomerComponent } from './pages/update-customer/update-customer.component';
import { CustomerService } from './shared/services/customer.service';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomerListComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [CustomerService]

})
export class CustomersModule { }
