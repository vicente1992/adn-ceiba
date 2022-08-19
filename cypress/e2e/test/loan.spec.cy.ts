import { loanPage } from '../page/loan-page';

const loansList = [
  {
    id: 1,
    name: 'manuel Ortiz',
    amount: 100000,
    interests: 10,
    quotaNumber: 10,
    startDate: '2022-03-24T20:03:50.534Z',
    endDate: '2022-03-24T20:03:50.534Z',
    TotalToPay: 110000,
    balance: 110000,
    amountQuota: 110000,
    totalPaid: 0
  },
  {
    id: 2,
    name: 'manuel Vicente',
    amount: 100000,
    interests: 10,
    quotaNumber: 10,
    startDate: '2022-03-24T20:03:50.534Z',
    endDate: '2022-03-24T20:03:50.534Z',
    TotalToPay: 110000,
    balance: 110000,
    amountQuota: 110000,
    totalPaid: 0
  },
];

describe('loan.spec.cy.ts', () => {

  it('should visit loans list', () => {
    loanPage.setToken();
    loanPage.goToLoansList();

    cy.intercept('GET', '/loans*', {
      statusCode: 200,
      body: loansList
    });

    cy.get('.loans').its('length').should('eq', 2);

  });

  it('should visit and  create loan', () => {
    loanPage.setToken();
    loanPage.goToLoansList();

    cy.intercept('GET', '/loans*', {
      statusCode: 200,
      body: loansList
    });
    cy.get('.loans').its('length').should('eq', 2);

    loanPage.setToken();
    loanPage.goToFormCreate();
    loanPage.enterFieldName('Manuel Ortiz');
    loanPage.enterFieldAmount(100000);
    loanPage.enterFieldInterests(10);
    loanPage.enterFieldQuotaNumber(12);
    loanPage.enterFieldStartDate('2022-03-24');
    loanPage.enterFieldEndDate('2023-03-30');
    loanPage.clickCreateLoan();

  });

  it('should visit and  create payment', () => {
    loanPage.setToken();
    loanPage.goToLoansList();

    cy.intercept('GET', '/loans*', {
      statusCode: 200,
      body: loansList
    });
    cy.get('.loans').its('length').should('eq', 2);

    loanPage.goToFormCreatePay();
    loanPage.enterFieldAmountQuotaPay(10000);
    loanPage.clickCreatePayBtn();

  });

  it('should visit and delete loan', () => {
    loanPage.setToken();
    loanPage.goToLoansList();

    cy.intercept('GET', '/loans*', {
      statusCode: 200,
      body: loansList
    });

    cy.get('.loans').its('length').should('eq', 2);

    loanPage.clickDeleteLoan();

  });


  it('should visit and  create simulate', () => {
    loanPage.setToken();
    loanPage.goToFormCreateSimulate();
    loanPage.enterFieldAmountSimlate(2000000);
    loanPage.enterFieldQuotaNumberSimulate(10);
    loanPage.enterFieldInterestsSimulate(10);
    loanPage.enterFieldStartDateSimulat('2022-09-24');
    loanPage.clickCreateSimulateBtn();

  });
});