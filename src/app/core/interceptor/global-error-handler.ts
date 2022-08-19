import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from '@core/services/error.service';
import { NotificationService } from '@core/services/notification.service';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }


  handleError(error: Error | HttpErrorResponse): void {
    const notification = this.injector.get(NotificationService);
    const errorService = this.injector.get(ErrorService);

    let message;

    if (error instanceof HttpErrorResponse) {
      message = errorService.getServerMessage(error);
      notification.showError(message);
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      notification.showError(message);
    }

  }

}
