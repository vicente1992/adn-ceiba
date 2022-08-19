import { customerPage } from '../page/customer-page';


const customerList = [
  { id: 1, name: 'Cliente 1', documentNumber: '1234455', phone: '2737744', address: 'Cartagena' },
  { id: 2, name: 'Cliente 2', documentNumber: '1234455', phone: '2737744', address: 'Cartagena' },
  { id: 3, name: 'Cliente 3', documentNumber: '1234455', phone: '2737744', address: 'Cartagena' },
];

describe('customer.spec.cy.ts', () => {


  it('Visits the initial project page', () => {
    customerPage.setToken();
    customerPage.goToCustomersList();
    cy.contains('Clientes');
  });

  it('should visit customers list', () => {
    customerPage.setToken();
    customerPage.goToCustomersList();

    cy.intercept('GET', '/customers*', {
      statusCode: 200,
      body: customerList
    });

    cy.get('.customers-list').its('length').should('eq', 3);

  });

  it('should visit and  create customer', () => {
    customerPage.setToken();
    customerPage.goToFormCreate();
    customerPage.enterFieldName('Manuel Ortiz!!!!');
    customerPage.enterFieldDocumentNumber('123456');
    customerPage.enterFieldPhone('32002555');
    customerPage.enterFieldAddress('Cartagena');

    cy.intercept('POST', '/customers*', {
      statusCode: 201,
      body: { id: 1, name: 'Manuel Ortiz!!!!', documentNumber: '123456', phone: '32002555', address: 'Cartagena' },
    });

    customerPage.clickCreateCustomerBtn();

  });

  it('should visit and  update customer', () => {
    customerPage.setToken();
    customerPage.goToCustomersList();
    cy.intercept('GET', '/customers*', {
      statusCode: 200,
      body: customerList
    });

    cy.get('.customers-list').its('length').should('eq', 3);
    customerPage.goToUpdateCustomer();
    customerPage.enterFieldName('Manuel Ortiz!!!!');
    customerPage.enterFieldDocumentNumber('123456');
    customerPage.enterFieldPhone('32002555');
    customerPage.enterFieldAddress('Cartagena');
    customerPage.clickUpdateCustomerBtn();
    customerPage.goToCustomersList();
  });


  it('should visit and delete customer', () => {
    customerPage.setToken();
    customerPage.goToCustomersList();
    cy.intercept('GET', '/customers*', {
      statusCode: 200,
      body: customerList
    });

    cy.get('.customers-list').its('length').should('eq', 3);
    customerPage.clickDeleteCustomer();
  });




});