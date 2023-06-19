import { createAction, props } from '@ngrx/store';
import { UserWithToken } from 'src/app/core/models/user';

export const register = createAction('register');
export const setCurrentUser = createAction(
    'setCurrentUser',
    props<UserWithToken | {}>()
  );