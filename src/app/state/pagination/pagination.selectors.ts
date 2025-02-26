import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromPagination from '../pagination/pagination.reducers';

export const selectPagination =
  createFeatureSelector<fromPagination.State>('pagination');

export const selectCurrentPage = createSelector(
  selectPagination,
  (pagination) => pagination.currentPage
);
export const selectUsersCount = createSelector(
  selectPagination,
  (pagination) => pagination.totalCount
);
export const selectPageSize = createSelector(
  selectPagination,
  (pagination) => pagination.pageSize
);
// export const selectAllUsers = createSelector(
//   selectUser,
//   (state: State) => state.users
// );

// export const selectUsersLoaded = createSelector(
//   selectUser,
//   (usersState) => usersState.status === 'success' && usersState.users.length > 0
// );
// export const selectPagination = createSelector(
//   selectPagination,
//   (state) => state.pagination
// );
// export const selectCurrentPage = (state: AppState) => {
//   return state.user.pagination.currentPage;
// };
// export const selectUsersCount = (state: AppState) => {
//   return state.user.pagination.totalCount;
// };
// export const selectPageSize = (state: AppState) => {
//   return state.user.pagination.pageSize;
// };
