export const loanPage =
{
  setToken: () => {
    localStorage.setItem('token', '0.85so5b69isg0.85so5b69isg');
  },
  goToLoansList: () => {
    cy.visit('http://localhost:4200/');
    cy.get('#linkLoan').click();
  },
  // Form create loan
  goToFormCreate: () => {
    cy.get('#linkcreateLoan').click();
  },

  enterFieldName: (value) => {
    cy.get('#idName').type(value);
  },

  enterFieldAmount: (value) => {
    cy.get('#idAmount').type(value);
  },

  enterFieldInterests: (value) => {
    cy.get('#idInterests').type(value);
  },

  enterFieldQuotaNumber: (value) => {
    cy.get('#idQuotaNumber').type(value);
  },

  enterFieldStartDate: (value) => {
    cy.get('#idStartDate').type(value);
  },

  enterFieldEndDate: (value) => {
    cy.get('#idEndDate').type(value);
  },

  clickCreateLoan: () => {
    cy.get('#createLoanBtn')
      .click({ force: true });
  },

  // form create pay
  goToFormCreatePay: () => {
    cy.get('#linkcreatePay').click();
  },
  enterFieldNamePay: () => {
    cy.get('#idNamePay').should('have.attr', 'readonly', 'readonly');
  },
  enterFieldAmountPay: () => {
    cy.get('#idAmountPay').should('have.attr', 'readonly', 'readonly');
  },
  enterFieldInterestsPay: () => {
    cy.get('#idInterestsPay').should('have.attr', 'readonly', 'readonly');
  },
  enterFieldQuotaNumberPay: () => {
    cy.get('#idQuotaNumberPay').should('have.attr', 'readonly', 'readonly');
  },
  enterFieldAmountQuotaPay: (value) => {
    cy.get('#idAmountQuotaPay').type(value);
  },

  clickCreatePayBtn: () => {
    cy.get('#createPayBtn').click({ force: true });
  },

  clickDeleteLoan: () => {
    cy.get('#btnDeleteLoan').click();

  },

  // form simulate loan 
  goToFormCreateSimulate: () => {
    cy.visit('http://localhost:4200');
    cy.get('#linkSimulate').click();
  },
  enterFieldAmountSimlate: (value) => {
    cy.get('#idAmountSimlate').type(value);
  },
  enterFieldQuotaNumberSimulate: (value) => {
    cy.get('#idQuotaNumberSimulate').type(value);
  },
  enterFieldInterestsSimulate: (value) => {
    cy.get('#idInterestsSimulate').type(value);
  },
  enterFieldStartDateSimulat: (value) => {
    cy.get('#idStartDateSimulat').type(value);
  },

  clickCreateSimulateBtn: () => {
    cy.get('#createSimulateBtn').click();
  },

};