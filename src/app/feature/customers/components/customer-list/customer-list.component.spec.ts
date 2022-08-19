import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Customer } from '@feature/customers/shared/models/customer';
import { CustomerService } from '@feature/customers/shared/services/customer.service';
import { of } from 'rxjs';

import { CustomerListComponent } from './customer-list.component';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let mockCustomerService: CustomerService;
  const dummyCustomer: Customer = {
    id: 1, name: 'Cliente 1', documentNumber: '1234455', phone: '2737744', address: 'Cartagena'
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      imports: [
        CommonModule,
        BrowserModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [CustomerService, HttpService],
    })
      .compileComponents();
    mockCustomerService = TestBed.inject(CustomerService);
    spyOn(mockCustomerService, 'deleteCustomer').and.returnValue(of(true));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('I should delete customer', () => {
    spyOn(component, 'getCustomers');
    component.deleteCustomer(dummyCustomer);

    expect(mockCustomerService.deleteCustomer).toHaveBeenCalled();
    expect(component.getCustomers).toHaveBeenCalled();
  });


  it('I should get customers', () => {
    component.cbgetCustomer.subscribe((getCustomers: boolean) => expect(getCustomers).toBeTruthy());
    component.getCustomers();
  });
});
