import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { selectErrorMessage } from '../../../state/users/user.selectors';
import { clearError } from '../../../state/users/user.action';

@Component({
  selector: 'app-error-notification',
  standalone: true,
  imports: [],
  templateUrl: './error-notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorNotificationComponent {
  private store = inject(Store);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.store.select(selectErrorMessage).subscribe((message) => {
      if (message) {
        this.snackBar.open(message, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });

        // Clear the error message after displaying it
        this.store.dispatch(clearError());
      }
    });
  }
}
