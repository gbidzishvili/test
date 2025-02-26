import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromPagination from './filter.reducers';

export const selectPagination =
  createFeatureSelector<fromPagination.State>('filter');

export const selectFilterValue = createSelector(
  selectPagination,
  (state) => state.filter
);
export const selectSortValue = createSelector(
  selectPagination,
  (state) => state.sort
);
export const selectCurrentPage = createSelector(
  selectPagination,
  (state) => state.pagination.currentPage
);
export const selectUsersCount = createSelector(
  selectPagination,
  (state) => state.pagination.totalCount
);
export const selectPageSize = createSelector(
  selectPagination,
  (state) => state.pagination.pageSize
);
