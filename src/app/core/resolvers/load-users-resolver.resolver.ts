import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  delay,
  filter,
  first,
  map,
  take,
  tap,
} from 'rxjs/operators';
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
  return usersService.loadUsersByPage(0, 6).pipe(
    tap((response: any) => {
      const users = response.body;
      const totalCount = response['headers'].get('X-Total-Count');
      if (users.length > 0) {
        store.dispatch(
          loadUsersSuccess({
            users: users,
            count: totalCount,
          })
        );
      }
    })
  );
};
