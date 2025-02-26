import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';
import * as fromUser from './users/user.reducer';
import * as fromFilter from './filter/filter.reducers';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.reducer,
  filter: fromFilter.reducer,
};
