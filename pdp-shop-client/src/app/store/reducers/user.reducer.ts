

import { createReducer, on } from '@ngrx/store';
import { setCurrentUser } from '../actions/user.actions';
import { UserWithToken } from 'src/app/core/models/user';
import { setCategories } from '../actions/category.actions';

export const initialState: UserWithToken | {} = {};

export const userReducer = createReducer(
  initialState,
  on(setCurrentUser, (state, user) => ({...state, ...user})),
);