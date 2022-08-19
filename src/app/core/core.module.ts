import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityGuard } from './guard/security.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ManejadorError } from './interceptor/manejador-error';
import { GlobalErrorHandler } from './interceptor/global-error-handler';
import { HttpService } from './services/http.service';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [ToolbarComponent, NavbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot(
      {
        timeOut: 4000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    )
  ],
  exports: [ToolbarComponent, NavbarComponent, SidebarComponent],
  providers: [
    HttpService,
    SecurityGuard,
    ErrorService,
    NotificationService,
    ToastrService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ManejadorError },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]
})
export class CoreModule { }
