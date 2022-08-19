import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [NotificationService, ToastrService],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('I should show an error message', () => {

    const message = 'Ha ocurrido un error';

    spyOn(service, 'showError');
    service.showError(message);
    expect(service.showError).toHaveBeenCalled();

  });

  it('I should show an success message', () => {

    const message = 'Operación exitosa';

    spyOn(service, 'showSuccess');
    service.showSuccess(message);
    expect(service.showSuccess).toHaveBeenCalled();

  });
});
