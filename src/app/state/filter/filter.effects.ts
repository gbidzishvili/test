import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  mergeMap,
  concatMap,
  catchError,
  of,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import {
  loadUsersBypage,
  loadUsersSuccess,
  loadUsersFailure,
  filterUsers,
  filterUsersFailure,
  filterUsersSuccess,
  sortUsers,
  sortUsersFailure,
  sortUsersSuccess,
} from '../users/user.action';
import { updateSort, updateUsersTotalCount } from './filter.actions';
import { Store } from '@ngrx/store';
import { UsersService } from '../../features/users/services/users.service';
import { AppState } from '../app.state';
import { User } from '../../features/users/models/user.model';

@Injectable()
export class FilterEffects {
  actions$ = inject(Actions);
  store = inject(Store<AppState>);
  usersService = inject(UsersService);
  loadUsersByPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersBypage),
      mergeMap(() =>
        this.usersService.loadUsersByPage().pipe(
          concatMap((response: any) => {
            const totalCount = +response.headers.get('X-Total-Count');
            const users = response.body;
            return [
              loadUsersSuccess({ users }),
              updateUsersTotalCount({ totalCount }),
            ];
          }),
          catchError((error) => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );
  filterUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterUsers),
      debounceTime(500), // Wait for 500ms after the last action
      distinctUntilChanged(),
      switchMap(({ filterByValue }) =>
        this.usersService.filterUsers(filterByValue).pipe(
          map((filteredUsers: User[]) =>
            filterUsersSuccess({ filteredUsers: filteredUsers })
          ),
          catchError((error) =>
            of(filterUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );
  sortUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sortUsers),
      switchMap(({ sortLabel }) =>
        this.usersService.sortUsers(sortLabel).pipe(
          concatMap(
            (sortedUsers: User[]) => {
              return [
                sortUsersSuccess({ sortedUsers: sortedUsers }),
                updateSort({ sortBy: sortLabel }),
              ];
            } // Dispatch success action
          ),
          catchError(
            (error) => of(sortUsersFailure({ error: error.message })) // Dispatch failure action
          )
        )
      )
    )
  );
}
