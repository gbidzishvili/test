import { createReducer, on } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';
import { addUser, removeUser, updateUser } from './user.action';

export interface UserState {
  users: User[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}
export const initialState: UserState = {
  users: [],
  error: null,
  status: 'pending',
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
  on(updateUser, (state, { id, user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === id ? user : u)),
  }))
);
