import { customerPage } from '../page/customer-page';
import { loginPage } from '../page/login-page';

const loginData = [{
  id: 1,
  email: 'manuel.ortiz@ceiba.com.co',
  password: '123456'
}];

describe('login.spec.cy.ts', () => {

  it('Visits the login page', () => {
    loginPage.goToLogin();
    cy.contains('Login');
    cy.contains('Hola, Bienvenido');
  });

  it('should visit and login', () => {

    loginPage.goToLogin();
    loginPage.enterFieldEmail('manuel.ortiz@ceiba.com.co');
    loginPage.enterFieldPasswprd('123456');


    cy.intercept('GET', '/login*', {
      statusCode: 201,
      body: loginData,
    });

    loginPage.clickLogin();



  });

});