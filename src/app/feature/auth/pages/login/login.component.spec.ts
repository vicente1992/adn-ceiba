import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { Login } from '@feature/auth/shared/models/login';
import { AuthService } from '@feature/auth/shared/services/auth.service';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: AuthService;
  const dummunLogin: Login = {
    id: 1,
    email: 'manuel.ortiz@ceiba.com.co',
    password: '123456',
    token: 'jsjsjsksksslsl39393'

  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [AuthService, HttpService]
    })
      .compileComponents();
    mockAuthService = TestBed.inject(AuthService);
    spyOn(mockAuthService, 'login').and.returnValue(of(dummunLogin));
    spyOn(mockAuthService, 'saveToken').and.returnValue(localStorage.setItem('token', 'jdjdjdjjdjdjd'));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('I should login and redirect', () => {

    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls.email.setValue('manuel.ortiz@ceiba.com.co');
    component.loginForm.controls.password.setValue('123456');
    expect(component.loginForm.valid).toBeTruthy();

    spyOn(component, 'goToHome');
    component.login();


    expect(mockAuthService.login).toHaveBeenCalled(); 
    expect(component.goToHome).toHaveBeenCalled();

  });

  it('If the token exists it should redirect to home', () => {
    const token: string = mockAuthService.generateToken();
    localStorage.setItem('token', token);

    spyOn(component, 'goToHome');
    component.ngOnInit();
    fixture.detectChanges();

    expect(localStorage.getItem('token')).toEqual(token);

    expect(component.goToHome).toHaveBeenCalled();

  });

  it('Navigate to /Home.', inject([Router], (mockRouter: Router) => {
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.goToHome();
    expect(spy.calls.first().args[0]).toEqual(['/']);

  }));
});
