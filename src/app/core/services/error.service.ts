import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

  getClientMessage(error: Error): string {
    return error.message ? error.message : error.toString();
  }

  getServerMessage(error: HttpErrorResponse): string {
    return error.message;
  }

}
