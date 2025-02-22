import { createAction, props } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';

export const addUser = createAction(
  '[Add User Page] Add User',
  props<{ user: User }>()
);
export const removeUser = createAction(
  '[Users Page] Remove User',
  props<{ id: string }>()
);
