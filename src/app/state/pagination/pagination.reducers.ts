import { createReducer, on } from '@ngrx/store';
import { loadUsersBypage } from '../users/user.action';
import {
  updateUsersTotalCount,
  updatePageSize,
  updateCurrentPage,
} from './pagination.actions';

export interface State {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

export const initialState: State = {
  totalCount: 0,
  pageSize: 3,
  currentPage: 0,
};

export const reducer = createReducer(
  initialState,
  on(updateUsersTotalCount, (state, { totalCount }) => ({
    ...state,
    totalCount: totalCount,
  })),
  on(updatePageSize, (state, { pageSize }) => ({
    ...state,
    pageSize: pageSize,
  })),
  on(updateCurrentPage, (state, { currentPage }) => ({
    ...state,
    currentPage: currentPage,
  })),
  on(loadUsersBypage, (state, { pageSize }) => ({
    ...state,
    pageSize: pageSize,
  }))
);
