import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { UsersService } from '../../features/users/services/users.service';
import {
  addUser,
  loadUsers,
  loadUsersBypage,
  loadUsersFailure,
  loadUsersSuccess,
  removeUser,
  updateUser,
  filterUsers,
  filterUsersSuccess,
  filterUsersFailure,
  sortUsers,
  sortUsersSuccess,
  sortUsersFailure,
  updateUserFailure,
  updateUserSuccess,
} from './user.action';
import {
  catchError,
  concatMap,
  debounceTime,
  delay,
  distinctUntilChanged,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { updateUsersTotalCount } from '../pagination/pagination.actions';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  store = inject(Store<AppState>);
  usersService = inject(UsersService);
  addUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addUser),
        switchMap(({ user }) => this.usersService.addUser(user))
      ),
    { dispatch: false }
  );
  removeUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeUser),
        switchMap(({ id }) =>
          this.usersService.removeUser(id).pipe(
            catchError((error) => {
              console.error('Error removing user:', error);
              return of({ type: '[User] Remove User Failure', error });
            })
          )
        )
      ),
    { dispatch: false } // Do not dispatch any action after removal
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(({ id, updatedUser: updateUser }) =>
        this.usersService.updateUser(id, updateUser).pipe(
          map((response) => updateUserSuccess({ updatedUser: response })),
          catchError((error) => of(updateUserFailure({ error })))
        )
      )
    )
  );
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.usersService.loadAllUsers().pipe(
          map((users: User[]) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );
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
          map(
            (sortedUsers: User[]) =>
              sortUsersSuccess({ sortedUsers: sortedUsers }) // Dispatch success action
          ),
          catchError(
            (error) => of(sortUsersFailure({ error: error.message })) // Dispatch failure action
          )
        )
      )
    )
  );
}
