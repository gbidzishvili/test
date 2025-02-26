import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './user.reducer';
import * as fromUser from './user.reducer';

export const selectUser = createFeatureSelector<fromUser.State>('user');

export const selectAllUsers = createSelector(
  selectUser,
  (state: State) => state.users
);

export const selectUsersLoaded = createSelector(
  selectUser,
  (usersState) => usersState.status === 'success' && usersState.users.length > 0
);
