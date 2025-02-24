import { createReducer, on } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';
import {
  addUser,
  filterUsers,
  filterUsersFailure,
  filterUsersSuccess,
  loadUsers,
  loadUsersBypage,
  loadUsersFailure,
  loadUsersSuccess,
  removeUser,
  sortUsers,
  sortUsersFailure,
  sortUsersSuccess,
  updateUser,
} from './user.action';
import { selectUsers } from './user.selectors';
import { StatusEnum } from '../enums/status.enums';

export interface UserState {
  users: User[];
  totalCount: number;
  pageSize: number;
  error: string | null;
  status: StatusEnum;
}
export const initialState: UserState = {
  users: [],
  totalCount: 0,
  pageSize: 0,
  error: null,
  status: StatusEnum.Pending,
};
export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(removeUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((user: User) => user.id !== id),
  })),
  on(updateUser, (state, { id, updatedUser: updateUser }) => ({
    ...state,
    users: state.users.map((existingUser) =>
      existingUser.id === id ? updateUser : existingUser
    ),
  })),
  on(loadUsers, (state) => ({ ...state, status: StatusEnum.Loading })),
  // on(updateTotalCount)
  on(loadUsersSuccess, (state, { users, count = 0 }) => {
    return {
      ...state,
      users: users,
      totalCount: count,
      error: null,
      status: StatusEnum.Success,
    };
  }),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error: error })),

  on(loadUsersBypage, (state, { pageSize }) => ({
    ...state,
    pageSize: pageSize,
  })),

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

  on(sortUsersSuccess, (state, { sortedUsers }) => ({
    ...state,
    users: sortedUsers,
    status: StatusEnum.Success,
  })),

  on(sortUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error,
  }))
);
