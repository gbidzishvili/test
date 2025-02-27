import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorNotificationService } from '../services/error-notification.service';
import { inject } from '@angular/core';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const errorNotificationService = inject(ErrorNotificationService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorNotificationService.handleError(error);
      return throwError(() => error);
    })
  );
};
