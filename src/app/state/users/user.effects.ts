import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { UsersService } from '../../features/users/services/users.service';
import {
  addUser,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  removeUser,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from './user.action';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
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
}
