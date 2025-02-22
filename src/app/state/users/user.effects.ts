import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { UserService } from '../../features/users/services/user.service';
import { addUser, removeUser } from './user.action';
import { catchError, of, switchMap, tap } from 'rxjs';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  store = inject(Store<AppState>);
  userService = inject(UserService);
  addUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addUser),
        tap(() => console.log('tap shimainc rame')),
        switchMap(({ user }) => this.userService.addUser(user))
      ),
    { dispatch: false }
  );
  removeUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeUser),
        switchMap(({ id }) =>
          this.userService.removeUser(id).pipe(
            catchError((error) => {
              console.error('Error removing user:', error);
              return of({ type: '[User] Remove User Failure', error });
            })
          )
        )
      ),
    { dispatch: false } // Do not dispatch any action after removal
  );
}
