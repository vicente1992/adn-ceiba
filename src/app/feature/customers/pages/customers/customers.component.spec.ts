import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HttpService } from '@core/services/http.service';
import { Customer } from '@feature/customers/shared/models/customer';
import { CustomerService } from '@feature/customers/shared/services/customer.service';

import { CustomersComponent } from './customers.component';
import { CustomerListComponent } from '@feature/customers/components/customer-list/customer-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let customerService: CustomerService;
  const customersList: Customer[] = [
    { id: 1, name: 'Producto 1', documentNumber: '1234455', phone: '2737744', address: 'Cartagena' },
    { id: 2, name: 'Producto 1', documentNumber: '1234455', phone: '2737744', address: 'Cartagena' },
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersComponent, CustomerListComponent],
      imports: [CommonModule,
        HttpClientTestingModule,
        RouterTestingModule],
      providers: [CustomerService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    customerService = TestBed.inject(CustomerService);
    spyOn(customerService, 'getAllCustomers').and.returnValue(
      of(customersList)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.customers$.subscribe(result => {
      expect(2).toBe(result.length);
    });
  });
});
