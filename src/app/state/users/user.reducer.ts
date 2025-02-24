import { createReducer, on } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';
import {
  addUser,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  removeUser,
  updateUser,
} from './user.action';
import { selectUsers } from './user.selectors';
import { StatusEnum } from '../enums/status.enums';

export interface UserState {
  users: User[];
  error: string | null;
  status: StatusEnum;
}
export const initialState: UserState = {
  users: [],
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
  on(loadUsersSuccess, (state, { users }) => {
    console.log('Updating users in state', users); // Log users here
    return { ...state, users: users, error: null, status: StatusEnum.Success };
  }),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error: error }))
);
