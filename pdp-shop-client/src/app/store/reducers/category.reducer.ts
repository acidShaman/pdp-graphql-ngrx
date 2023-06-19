import { createReducer, on } from '@ngrx/store';
import { setCategories } from '../actions/category.actions';
import { Category } from 'src/app/core/models/category';

export const initialState: Category[] = [];

export const categoryReducer = createReducer(
  initialState,
  on(setCategories, (state, {categories}) => categories),
);