import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';
import * as fromUser from './users/user.reducer';
import * as fromPagination from './pagination/pagination.reducers';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.reducer,
  pagination: fromPagination.reducer,
};
