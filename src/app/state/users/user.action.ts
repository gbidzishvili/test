import { createAction, props } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';

export const addUser = createAction(
  '[Add User Page] Add User',
  props<{ user: User }>()
);
export const updateUser = createAction(
  '[Users Page] Update User',
  props<{ id: string; updatedUser: User }>()
);

export const removeUser = createAction(
  '[User Details Page] Remove User',
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

// pagination
export const updateUsersTotalCount = createAction(
  '[Users Service] Update Users Total Count',
  props<{ totalCount: number }>()
);
// Filter Actions
export const filterUsers = createAction(
  '[Users] Filter Users',
  props<{ filterByValue: string }>()
);

export const filterUsersSuccess = createAction(
  '[Users] Filter Users Success',
  props<{ filteredUsers: User[] }>()
);

export const filterUsersFailure = createAction(
  '[Users] Filter Users Failure',
  props<{ error: string }>()
);
