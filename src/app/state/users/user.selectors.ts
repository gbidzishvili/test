import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

// export cosnt addUser = createAction()
export const selectUsers = (state: AppState) => {
  return state.user;
};
export const selectAllUsers = createSelector(
  selectUsers,
  (state: UserState) => state.users
);
export const selectUsersCount = (state: AppState) => {
  return state.user.pagination.totalCount;
};
export const selectPageSize = (state: AppState) => {
  return state.user.pagination.pageSize;
};
export const selectCurrentPage = (state: AppState) => {
  return state.user.pagination.currentPage;
};
export const selectUsersLoaded = createSelector(
  selectUsers,
  (usersState) => usersState.status === 'success' && usersState.users.length > 0
);
