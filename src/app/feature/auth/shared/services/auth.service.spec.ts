import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const dummunLogin: Login = {
    id: 1,
    email: 'manuel.ortiz@ceiba.com.co',
    password: '123456'
  };
  const apiEndpointAuth = `${environment.endpoint}/login?${dummunLogin.email}&${dummunLogin.password}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,],
      providers: [AuthService, HttpService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  xit('should login', () => {

    service.login(dummunLogin)
      .subscribe((user) => {
        console.log(user);
      });

    const reqLogin = httpMock.expectOne(`${apiEndpointAuth}`);
    expect(reqLogin.request.method).toBe('GET');

  });

  it('should be save token', () => {
    const token = 'dkdkdkdk';
    service.saveToken(token);
    expect(localStorage.getItem('token')).toBeTruthy();
  });

});
