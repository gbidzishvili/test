import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

// export cosnt addUser = createAction()
export const selectUsers = (state: any) => {
  return state.user;
};
export const selectAllUsers = createSelector(
  selectUsers,
  (state: UserState) => state.users
);
