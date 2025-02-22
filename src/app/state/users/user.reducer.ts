import { createReducer, on } from '@ngrx/store';
import { User } from '../../features/users/models/user.model';
import { addUser, removeUser } from './user.action';

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
    users: [...state.users, { ...user, id: Date.now().toString() }],
  })),
  on(removeUser, (state, { id }) => ({
    ...state,
    // users: state.users.filter((user: User) => user.id !== id),
  }))
  // on(removeUser, (state, { id }) => ({
  //   ...state,
  //   users: state.users.filter((user: User) => user.id !== id),
  // }))
);
