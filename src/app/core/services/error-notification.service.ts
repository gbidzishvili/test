import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { showError } from '../../state/users/user.action';

@Injectable({
  providedIn: 'root',
})
export class ErrorNotificationService {
  snackBar = inject(MatSnackBar);
  translate = inject(TranslateService);
  store = inject(Store);
  handleError(error: HttpErrorResponse): void {
    let errorMessage = this.translate.instant('errors.unknownError');
    if (error.error instanceof ErrorEvent) {
      errorMessage = this.translate.instant('errors.clientError', {
        message: error.error.message,
      });
    } else {
      errorMessage = this.translate.instant('errors.serverError', {
        code: error.status,
        message: error.message,
      });
    }
    this.store.dispatch(showError({ error: errorMessage }));

    // this.snackBar.open(errorMessage, 'Close', {
    //   duration: 5000,
    //   panelClass: ['error-snackbar'],
    // });
  }
}
