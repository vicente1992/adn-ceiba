import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Customer } from '@feature/customers/shared/models/customer';
import { CustomerService } from '@feature/customers/shared/services/customer.service';
import { of } from 'rxjs';

import { UpdateCustomerComponent } from './update-customer.component';

describe('UpdateCustomerComponent', () => {
  let component: UpdateCustomerComponent;
  let fixture: ComponentFixture<UpdateCustomerComponent>;
  let mockCustomerService: CustomerService;
  const dummyCustomer: Customer = {
    id: 1, name: 'Cliente 1', documentNumber: '1234455', phone: '2737744', address: 'Cartagena'
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCustomerComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [CustomerService, HttpService]
    })
      .compileComponents();

    mockCustomerService = TestBed.inject(CustomerService);
    spyOn(mockCustomerService, 'updateCustomer').and.returnValue(of(dummyCustomer));
    spyOn(mockCustomerService, 'getCustomer').and.returnValue(of(dummyCustomer));

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Existe el id', () => {
    component.id = 1;
    spyOn(component, 'getCustomer');
    expect(component.id).toBeTruthy();
    component.getCustomer(component.id);
    expect(component.getCustomer).toHaveBeenCalled();

  });

  it('I should get one customer', () => {
    const customerId = 1;
    component.getCustomer(customerId);

    expect(mockCustomerService.getCustomer).toHaveBeenCalled();
    expect(component.customerForm.valid).toBeTruthy();

  });


  it('I should update a customer and redirect', () => {

    expect(component.customerForm.valid).toBeFalsy();
    component.customerForm.controls.name.setValue('Manuel Ortiz');
    component.customerForm.controls.documentNumber.setValue('123456');
    component.customerForm.controls.phone.setValue('3255668554');
    component.customerForm.controls.address.setValue('Cartagena');
    expect(component.customerForm.valid).toBeTruthy();

    spyOn(component, 'goTocustomer');

    component.onSubmit();

    expect(mockCustomerService.updateCustomer).toHaveBeenCalled();
    expect(component.goTocustomer).toHaveBeenCalled();
  });

  it('Navigate to /loans customers.', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.goTocustomer();
    expect(spy.calls.first().args[0]).toEqual(['/', 'customers']);

  }));
});
