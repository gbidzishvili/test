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
  '[Users Page] Remove User',
  props<{ id: string }>()
);

export const loadUsers = createAction('[User Dashboard] Load Users');

export const loadUsersSuccess = createAction(
  '[Users API] User Load Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Users API] User Load Failure',
  props<{ error: string }>()
);
