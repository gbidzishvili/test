import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, EMPTY, Observable } from 'rxjs';
import { catchError, filter, first, map, take, tap } from 'rxjs/operators';
import { AppState } from '../../state/app.state';
import {
  selectAllUsers,
  selectUsersLoaded,
} from '../../state/users/user.selectors';
import {
  loadUsersBypage,
  loadUsersSuccess,
} from '../../state/users/user.action';
import { UsersService } from '../../features/users/services/users.service';

export const loadUsersResolver: ResolveFn<any> = () => {
  const usersService = inject(UsersService);
  const store = inject(Store);
  // Return the list of users once they are loaded
  return usersService.loadUsersByPage(1, 7).pipe(
    map((v: any) => {
      loadUsersSuccess({ users: v, count: 5 });
      return v;
    })
  );
};
