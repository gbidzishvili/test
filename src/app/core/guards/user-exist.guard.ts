import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../../features/users/services/users.service';
import { catchError, map, of } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { inject } from '@angular/core';
import { CacheRequestService } from '../services/cache-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const userExistGuard: CanActivateFn = (route, state) => {
  const id = route.paramMap.get('id');
  const cacheRequestService = inject(CacheRequestService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  if (id) {
    return cacheRequestService.getUserById(id).pipe(
      map(() => true),
      catchError(() => {
        snackBar.open('Cannot access this route. User not found.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
        router.navigate(['/users-list']);
        return of(false);
      })
    );
  }

  router.navigate(['/users-list']);
  return of(false);
};
