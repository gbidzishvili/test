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
  updateUserFailure,
  updateUserSuccess,
} from './user.action';
import { selectUsers } from './user.selectors';
import { StatusEnum } from '../enums/status.enums';

export interface UserState {
  users: User[];
  totalCount: number;
  pageSize: number;
  error: string | null;
  status: StatusEnum;
  pagination: {
    totalCount: number;
    pageSize: number;
    currentPage: number;
  };
}
export const initialState: UserState = {
  users: [],
  totalCount: 0,
  pageSize: 10,
  error: null,
  status: StatusEnum.Pending,
  pagination: {
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
  },
};
export const userReducer = createReducer(
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
  // on(updateTotalCount)
  on(loadUsersSuccess, (state, { users, count = 0 }) => {
    return {
      ...state,
      users: users,
      error: null,
      status: StatusEnum.Success,
      pagination: {
        // Properly update nested pagination
        ...state.pagination,
        totalCount: count,
      },
    };
  }),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error: error })),

  on(loadUsersBypage, (state, { pageSize }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      pageSize: pageSize,
    },
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

  on(sortUsersSuccess, (state, { sortedUsers }) => {
    console.log('Reducer - Sorted Users:', sortedUsers); // Debugging reducer execution
    return {
      ...state,
      users: [...sortedUsers], // Ensure a new array reference
      status: StatusEnum.Success,
    };
  }),

  on(sortUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error,
  }))
);
