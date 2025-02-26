import { createReducer, on } from '@ngrx/store';
import { loadUsersBypage } from '../users/user.action';
import {
  updateUsersTotalCount,
  updatePageSize,
  updateCurrentPage,
  updateFilter,
  updateSort,
} from './filter.actions';

export interface State {
  filter: string;
  sort: string;
  pagination: {
    totalCount: number;
    pageSize: number;
    currentPage: number;
  };
}

export const initialState: State = {
  filter: '',
  sort: '',
  pagination: {
    totalCount: 0,
    pageSize: 3,
    currentPage: 0,
  },
};

export const reducer = createReducer(
  initialState,
  on(updateFilter, (state, { filterBy }) => ({
    ...state,
    filter: filterBy,
  })),
  on(updateSort, (state, { sortBy }) => ({
    ...state,
    sort: sortBy,
  })),
  on(updateUsersTotalCount, (state, { totalCount }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      totalCount: totalCount,
    },
  })),
  on(updatePageSize, (state, { pageSize }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      pageSize: pageSize,
    },
  })),
  on(updateCurrentPage, (state, { currentPage }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      currentPage: currentPage,
    },
  })),
  on(loadUsersBypage, (state, { pageSize }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      pageSize: pageSize,
    },
  }))
);
