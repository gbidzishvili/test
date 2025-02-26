import * as fromUser from './users/user.reducer';
import * as fromPagination from './filter/filter.reducers';

export interface AppState {
  user: fromUser.State;
  filter: fromPagination.State;
}
