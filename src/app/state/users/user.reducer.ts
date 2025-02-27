import { createReducer, on } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';
import {
  addAccountFailure,
  addAccountSuccess,
  addUser,
  addUserFailure,
  addUserSuccess,
  filterUsersFailure,
  filterUsersSuccess,
  loadAccountsFailure,
  loadAccountsSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  removeAccountSuccess,
  removeUser,
  removeUserSuccess,
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
  on(sortUsers, (state) => ({
    ...state,
    status: StatusEnum.Loading,
  })),
  on(removeUser, (state, { id }) => ({
    ...state,
  })),
  on(updateUser, (state) => ({
    ...state,
    status: StatusEnum.Loading,
  })),
  on(loadUsers, (state) => ({ ...state, status: StatusEnum.Loading })),
  on(filterUsers, (state) => ({
    ...state,
    status: StatusEnum.Loading,
  })),

  on(addUserSuccess, (state, { user }) => {
    alert('User Added Successfully');
    return {
      ...state,
      users: [...state.users, user],
      error: null,
      status: StatusEnum.Success,
    };
  }),
  on(loadAccountsSuccess, (state, { accounts }) => {
    const validAccounts = Array.isArray(accounts) ? accounts : [];
    return {
      ...state,
      accounts: [...validAccounts],
    };
  }),

  on(removeAccountSuccess, (state, { id }) => {
    alert('Account has removed successfully');
    return {
      ...state,
      accounts: state.accounts.filter((account: Account) => account.id !== id),
    };
  }),

  on(updateUserSuccess, (state, { updatedUser }) => {
    console.log('users in reducer', state);
    const validUpdatedUser =
      updatedUser && typeof updatedUser === 'object' ? updatedUser : null;
    return {
      ...state,
      users: state.users.map((user) =>
        user.id === validUpdatedUser?.id ? validUpdatedUser : user
      ),
      error: null,
      status: StatusEnum.Success,
    };
  }),

  on(loadUsersSuccess, (state, { users }) => {
    console.log('loadUsersSuccess reducer', users);
    return {
      ...state,
      users: users,
      error: null,
      status: StatusEnum.Success,
    };
  }),
  on(addAccountSuccess, (state, { account }) => {
    return {
      ...state,
      accounts: [...state.accounts, account],
      error: null,
      status: StatusEnum.Success,
    };
  }),
  on(filterUsersSuccess, (state, { filteredUsers }) => ({
    ...state,
    users: filteredUsers,
    status: StatusEnum.Success,
  })),
  on(sortUsersSuccess, (state, { sortedUsers }) => {
    return {
      ...state,
      users: [...sortedUsers],
      status: StatusEnum.Success,
    };
  }),

  // onfailure
  on(sortUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error,
  })),
  on(filterUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error,
  })),
  on(addUserFailure, (state, { error }) => ({ ...state, error: error })),
  on(updateUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StatusEnum.Error,
  })),
  on(addAccountFailure, (state, { error }) => ({ ...state, error: error })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error: error })),
  on(loadAccountsFailure, (state, { error }) => ({ ...state, error: error }))
);
