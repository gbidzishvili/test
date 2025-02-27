import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { UsersService } from '../../features/users/services/users.service';
import {
  addAccount,
  addAccountSuccess,
  addUser,
  addUserSuccess,
  loadAccounts,
  loadAccountsSuccess,
  loadUsers,
  loadUsersSuccess,
  removeAccount,
  removeAccountFailure,
  removeAccountSuccess,
  removeUser,
  removeUserFailure,
  removeUserSuccess,
  showError,
  updateUser,
  updateUserSuccess,
} from './user.action';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { AccountsService } from '../../features/users/components/user-details/services/accounts.service';
import { Account } from '../../features/users/models/account.model';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  store = inject(Store<AppState>);
  usersService = inject(UsersService);
  accountService = inject(AccountsService);
  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap(({ user }) =>
        this.usersService.addUser(user).pipe(
          map(() => addUserSuccess({ user })),
          catchError((error) => of(showError({ error })))
        )
      )
    )
  );
  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeUser),
      switchMap(({ id }) =>
        this.usersService.removeUser(id).pipe(
          map(() => removeUserSuccess({ id })),
          catchError((error) => of(removeUserFailure({ error })))
        )
      )
    )
  );
  addAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAccount),
      switchMap(({ account }) =>
        this.accountService.addAccount(account).pipe(
          map(() => addAccountSuccess({ account })),
          catchError((error) => of(showError({ error })))
        )
      )
    )
  );

  removeAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeAccount),
      switchMap(({ id }) =>
        this.accountService.removeAccount(id).pipe(
          map(() => removeAccountSuccess({ id })),
          catchError((error) => of(removeAccountFailure({ error })))
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(({ id, updatedUser: updateUser }) =>
        this.usersService.updateUser(id, updateUser).pipe(
          map((response) => updateUserSuccess({ updatedUser: response })),
          catchError((error) => of(showError({ error })))
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
          catchError((error) => of(showError({ error })))
        )
      )
    )
  );
  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAccounts),
      switchMap(({ id }) =>
        this.accountService.loadAllAccounts(id).pipe(
          map((accounts: Account[]) => loadAccountsSuccess({ accounts })),
          catchError((error) => of(showError({ error })))
        )
      )
    )
  );
}
