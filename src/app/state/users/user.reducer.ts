import { createReducer, on } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';
import {
  addAccountSuccess,
  addUser,
  addUserSuccess,
  clearError,
  filterUsersSuccess,
  loadAccountsSuccess,
  loadUsers,
  loadUsersSuccess,
  removeAccountSuccess,
  removeUser,
  showError,
  sortUsersSuccess,
  updateUser,
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

  on(showError, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(clearError, (state) => ({ ...state, error: null }))
);
