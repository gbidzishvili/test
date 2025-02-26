// import { UserState } from './users/reducers/user.reducer';

// export interface AppState {
//   user: UserState;
// }

import * as fromUser from './users/user.reducer';
import * as fromPagination from './pagination/pagination.reducers';

export interface AppState {
  user: fromUser.State;
  pagination: fromPagination.State;
}
