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
  updateUsersTotalCount,
  updateUser,
  filterUsers,
  filterUsersSuccess,
  filterUsersFailure,
  sortUsers,
  sortUsersSuccess,
  sortUsersFailure,
} from './user.action';
import { catchError, from, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { User } from '../../features/users/models/user.model';

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
  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUser),
        switchMap(({ id, updatedUser: updateUser }) =>
          this.usersService.updateUser(id, updateUser).pipe(
            catchError((error) => {
              console.error('Error removing user:', error);
              return of({ type: '[User] Update User Failure', error });
            })
          )
        )
      ),
    { dispatch: false } // Do not dispatch any action after removal
  );
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.usersService.loadAllUsers().pipe(
          tap((v) => console.log('loadUsers', v)),
          map((users: User[]) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );
  loadUsersByPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersBypage),
      mergeMap(({ currentPage, pageSize }) =>
        this.usersService.loadUsersByPage(currentPage, pageSize).pipe(
          map((response: any) => {
            const totalCount = response.headers.get('X-Total-Count');
            return loadUsersSuccess({
              users: response.body,
              count: totalCount,
            });
          }),
          catchError((error) => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );
  filterUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterUsers),
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
          map((sortedUsers: User[]) =>
            sortUsersSuccess({ sortedUsers: sortedUsers })
          ),
          catchError((error) => of(sortUsersFailure({ error: error.message })))
        )
      )
    )
  );
}
