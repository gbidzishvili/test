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
