import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../../features/users/services/users.service';
import { catchError, map, of } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { inject } from '@angular/core';
import { CacheRequestService } from '../services/cache-request.service';

export const userExistGuard: CanActivateFn = (route, state) => {
  const id = route.paramMap.get('id');
  const cacheRequestService = inject(CacheRequestService);
  const router = inject(Router);
  if (id) {
    return cacheRequestService.getUserById(id).pipe(
      map(() => true),
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
