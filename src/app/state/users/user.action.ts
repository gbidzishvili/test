import { createAction, props } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';
import { Account } from '../../features/users/models/account.model';

export const addUser = createAction(
  '[Add User Page] Add User',
  props<{ user: User }>()
);
export const addUserSuccess = createAction(
  '[User API] add User Success',
  props<{ user: User }>()
);

export const addAccount = createAction(
  '[User Details Page] Add Account',
  props<{ account: Account }>()
);
export const addAccountSuccess = createAction(
  '[User API] add Account Success',
  props<{ account: Account }>()
);

export const removeAccount = createAction(
  '[Users API] Remove Account',
  props<{ id: string }>()
);
export const removeAccountSuccess = createAction(
  '[Users API] Remove Account Success',
  props<{ id: string }>()
);
export const removeUserSuccess = createAction(
  '[Users API] Remove User Success',
  props<{ id: string }>()
);
export const removeUserFailure = createAction(
  '[Users API] Remove User Failure',
  props<{ error: any }>()
);

export const removeAccountFailure = createAction(
  '[Users API] Remove Account Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[Edit User Page] Update User',
  props<{ id: string; updatedUser: User }>()
);
export const updateUserSuccess = createAction(
  '[Users API] Update User Success',
  props<{ updatedUser: User }>()
);

export const removeUser = createAction(
  '[User Details Page || Users List Page] Remove User',
  props<{ id: string }>()
);

export const loadUsers = createAction('[User Dashboard Page] Load Users');
export const loadAccounts = createAction(
  '[User Details Page] Load Accounts',
  props<{ id: string }>()
);

export const loadUsersSuccess = createAction(
  '[Users API] User Load Success',
  props<{ users: User[] }>()
);
export const loadAccountsSuccess = createAction(
  '[Users API] User Accounts Success',
  props<{ accounts: Account[] }>()
);
export const showError = createAction(
  '[Error] Show Error',
  props<{ error: string }>()
);
export const clearError = createAction('[Error] Clear Error');

export const sortUsersSuccess = createAction(
  '[Users List Page] Sort Users Success',
  props<{ sortedUsers: User[] }>()
);

export const filterUsersSuccess = createAction(
  '[Users List Page] Filter Users Success',
  props<{ filteredUsers: User[] }>()
);
