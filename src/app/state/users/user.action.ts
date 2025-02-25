import { createAction, props } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';

export const addUser = createAction(
  '[Add User Page] Add User',
  props<{ user: User }>()
);
export const updateUser = createAction(
  '[Edit User Page] Update User',
  props<{ id: string; updatedUser: User }>()
);
export const updateUserSuccess = createAction(
  '[Users API] Update User Success',
  props<{ updatedUser: User }>()
);

export const updateUserFailure = createAction(
  '[Users API] Update User Failure',
  props<{ error: any }>()
);
export const removeUser = createAction(
  '[User Details Page || Users List Page] Remove User',
  props<{ id: string }>()
);

export const loadUsers = createAction('[User Dashboard Page] Load Users');

export const loadUsersBypage = createAction(
  '[Users List Page] Load Users By Page',
  props<{ currentPage: number; pageSize: number }>()
);

export const loadUsersSuccess = createAction(
  '[Users API] User Load Success',
  props<{ users: User[]; count?: number }>()
);
export const loadUsersFailure = createAction(
  '[Users API] User Load Failure',
  props<{ error: string }>()
);
// sort
export const sortUsers = createAction(
  '[Users List Page] Sort users',
  props<{ sortLabel: string }>()
);
export const sortUsersSuccess = createAction(
  '[Users List Page] Sort Users Success',
  props<{ sortedUsers: User[] }>()
);
export const sortUsersFailure = createAction(
  '[Users] Sort Users Failure',
  props<{ error: string }>()
);
// pagination
export const updateUsersTotalCount = createAction(
  '[Users List Page] Update Users Total Count',
  props<{ totalCount: number }>()
);
// Filter Actions
export const filterUsers = createAction(
  '[Users List Page] Filter Users',
  props<{ filterByValue: string }>()
);

export const filterUsersSuccess = createAction(
  '[Users List Page] Filter Users Success',
  props<{ filteredUsers: User[] }>()
);

export const filterUsersFailure = createAction(
  '[Users] Filter Users Failure',
  props<{ error: string }>()
);
