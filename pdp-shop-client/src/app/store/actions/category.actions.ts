import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/core/models/category';
import { UserWithToken } from 'src/app/core/models/user';

export const register = createAction('register');
export const setCategories = createAction(
    'setCategories',
    props<{categories: Category[]}>()
  );