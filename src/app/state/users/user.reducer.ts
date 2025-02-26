import { createReducer, on } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';
import {
  addUser,
  filterUsersFailure,
  filterUsersSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  removeUser,
  sortUsersFailure,
  sortUsersSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from './user.action';
import { StatusEnum } from '../enums/status.enums';
import { Account } from '../../features/users/models/account.model';
import { filterUsers, sortUsers } from '../filter/filter.actions';

export interface State {
  users: User[];
  error: string | null;
  status: StatusEnum;
  accounts: Account[];
}
export const initialState: State = {
  users: [],
  error: null,
  status: StatusEnum.Pending,
  accounts: [],
};
export const reducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => ({
    ...state,
    users: [user, ...state.users],
  })),
  on(removeUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((user: User) => user.id !== id),
  })),
  on(updateUser, (state) => ({
    ...state,
    status: StatusEnum.Loading,
  })),
  on(updateUserSuccess, (state, { updatedUser }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    ),
    error: null,
    status: StatusEnum.Success,
  })),
  on(updateUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error,
  })),
  on(loadUsers, (state) => ({ ...state, status: StatusEnum.Loading })),
  on(loadUsersSuccess, (state, { users }) => {
    return {
      ...state,
      users: users,
      error: null,
      status: StatusEnum.Success,
    };
  }),
  // /////////////////////////////////////////

  on(loadUsersFailure, (state, { error }) => ({ ...state, error: error })),

  // filterUsers reducers
  on(filterUsers, (state) => ({
    ...state,
    status: StatusEnum.Loading,
  })),

  on(filterUsersSuccess, (state, { filteredUsers }) => ({
    ...state,
    users: filteredUsers,
    status: StatusEnum.Success,
  })),

  on(filterUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error,
  })),

  // sortUsers reducers
  on(sortUsers, (state) => ({
    ...state,
    status: StatusEnum.Loading,
  })),

  on(sortUsersSuccess, (state, { sortedUsers }) => {
    console.log('Reducer - Sorted Users:', sortedUsers);
    return {
      ...state,
      users: [...sortedUsers],
      status: StatusEnum.Success,
    };
  }),

  on(sortUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error,
  }))
);
