export const customerPage = {
  setToken: () => {
    localStorage.setItem('token', '0.85so5b69isg0.85so5b69isg');
  },
  goToFormCreate: () => {
    cy.visit('http://localhost:4200/');
    cy.get('#linkcreateCustomer').click();
  },
  goToCustomersList: () => {
    cy.visit('http://localhost:4200/');
  },
  goToUpdateCustomer: () => {
    cy.get('#linkUpdateCustomer').click();
  },
  enterFieldName: (name) => {
    cy.get('#idName').type(name);
  },
  enterFieldDocumentNumber: (documentNumber) => {
    cy.get('#idDocumentNumber').type(documentNumber);
  },
  enterFieldPhone: (phone) => {
    cy.get('#idPhone').type(phone);
  },

  enterFieldAddress: (address) => {
    cy.get('#idAddress').type(address);
  },

  clickCreateCustomerBtn: () => {
    cy.get('#createCustomerBtn').click();
  },

  clickUpdateCustomerBtn: () => {
    cy.get('#updateCustomerBtn').click();
  },

  clickDeleteCustomer: () => {
    cy.get('#btnDeleteCustomer').click();
  }

};