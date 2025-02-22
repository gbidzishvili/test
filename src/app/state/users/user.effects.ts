import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { UserService } from '../../features/users/services/user.service';
import { addUser } from './user.action';
import { switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  store = inject(Store<AppState>);
  userService = inject(UserService);
  addUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addUser),
        switchMap(({ user }) => this.userService.addUser(user))
      ),
    { dispatch: false }
  );
}
