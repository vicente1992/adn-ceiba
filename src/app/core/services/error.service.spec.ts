import { HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorService],
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('It should return the error message client', () => {
    const message = service.getClientMessage(new Error('Ocurrio un error'));
    expect(message).toEqual('Ocurrio un error');
  });

  it('It should return the error message server', () => {
    const error: HttpErrorResponse = {
      message: 'error de servidor',
      ok: false,
      error: 'Errorr',
      name: 'HttpErrorResponse',
      headers: new HttpHeaders(),
      status: 0,
      statusText: '',
      url: '',
      type: HttpEventType.ResponseHeader
    };

    const message = service.getServerMessage(error);
    expect(message).toEqual('error de servidor');
  });
});
