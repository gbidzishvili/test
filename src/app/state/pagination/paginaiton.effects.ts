import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, concatMap, catchError, of } from 'rxjs';
import {
  loadUsersBypage,
  loadUsersSuccess,
  loadUsersFailure,
} from '../users/user.action';
import { updateUsersTotalCount } from './pagination.actions';
import { Store } from '@ngrx/store';
import { UsersService } from '../../features/users/services/users.service';
import { AppState } from '../app.state';

@Injectable()
export class PaginationEffects {
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
}
