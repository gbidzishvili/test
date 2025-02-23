import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { UsersService } from '../../features/users/services/users.service';
import { addUser, removeUser, updateUser } from './user.action';
import { catchError, of, switchMap, tap } from 'rxjs';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  store = inject(Store<AppState>);
  usersService = inject(UsersService);
  addUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addUser),
        tap(() => console.log('tap shimainc rame')),
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
}
