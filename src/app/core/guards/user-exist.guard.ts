import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../../features/users/services/users.service';
import { catchError, map, of } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { inject } from '@angular/core';

export const userExistGuard: CanActivateFn = (route, state) => {
  const id = route.paramMap.get('id');
  const usersService = inject(UsersService);
  const router = inject(Router);
  if (id) {
    return usersService.getUserById(id).pipe(
      map((user: User) => {
        return true;
      }),
      catchError(() => {
        alert('Cannot access this route. User not found.');
        router.navigate(['/users-list']);
        return of(false);
      })
    );
  }

  router.navigate(['/users-list']);
  return of(false);
};
