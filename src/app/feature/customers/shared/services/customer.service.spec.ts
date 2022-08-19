import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let httpMock: HttpTestingController;
  let service: CustomerService;
  const apiEndpointCustomers = `${environment.endpoint}/customers`;
  let customerCreated: Customer;
  const dummyCustomer: Customer = {
    id: 1, name: 'Cliente 1', documentNumber: '1234455', phone: '2737744', address: 'Cartagena'
  };

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService, HttpService],
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CustomerService);
  });


  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const customerService: CustomerService = TestBed.inject(CustomerService);
    expect(customerService).toBeTruthy();
  });

  it('should list customers', () => {
    const customersList: Customer[] = [
      { id: 1, name: 'Cliente 1', documentNumber: '1234455', phone: '2737744', address: 'Cartagena' },
      { id: 2, name: 'Cliente 2', documentNumber: '1234455', phone: '2737744', address: 'Cartagena' },
    ];

    service.getAllCustomers()
      .subscribe((customers) => {
        expect(customers.length).toBe(2);
        expect(customers).toEqual(customersList);
      });

    const req = httpMock.expectOne(apiEndpointCustomers);
    expect(req.request.method).toBe('GET');
    req.flush(customersList);
  });

  it('I should create a customer', () => {

    service.createCustomer(dummyCustomer)
      .subscribe((customer) => {
        customerCreated = customer;
        expect(customer).toEqual(dummyCustomer);
      });
    const req = httpMock.expectOne(apiEndpointCustomers);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<Customer>({ body: req.request.body }));
  });


  it('I should  customers by his id', () => {
    const cutomerId = 1;
    service.getCustomer(cutomerId)
      .subscribe((customer) => {
        expect(customer).toBe(customerCreated);
        expect(customer).toEqual(customerCreated);
      });

    const reqGetUser = httpMock.expectOne(`${apiEndpointCustomers}/${cutomerId}`);
    expect(reqGetUser.request.method).toBe('GET');

  });

  it('I should update a customer', () => {

    service.updateCustomer(dummyCustomer.id, dummyCustomer)
      .subscribe((customer) => {
        expect(customer).toEqual(dummyCustomer);
      });
    const req = httpMock.expectOne(`${apiEndpointCustomers}/${dummyCustomer.id}`);
    expect(req.request.method).toBe('PATCH');
    req.event(new HttpResponse<Customer>({ body: req.request.body }));
  });


  it('I should delete a customer', () => {

    service.deleteCustomer(dummyCustomer).subscribe((response) => {
      expect(response).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointCustomers}/${dummyCustomer.id}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({ body: true }));
  });
});
