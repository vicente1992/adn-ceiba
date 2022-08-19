export const loginPage = {
  goToLogin: () => {
    cy.visit('http://localhost:4200/auth/login');
  },
  enterFieldEmail: (value) => {
    cy.get('#idEmailLogin').type(value);
  },
  enterFieldPasswprd: (value) => {
    cy.get('#idPasswordlogin').type(value);
  },

  clickLogin: () => {
    cy.get('#loginBtn').click();
  },
};
