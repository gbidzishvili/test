import { createAction, props } from '@ngrx/store';

export const filterUsers = createAction(
  '[Users List Page] Filter Users',
  props<{ filterByValue: string }>()
);
export const updateFilter = createAction(
  '[Users List Page] Update Users Filter Value',
  props<{ filterBy: string }>()
);
export const sortUsers = createAction(
  '[Users List Page] Sort users',
  props<{ sortLabel: string }>()
);
export const updateSort = createAction(
  '[Users List Page] Update Users Sort Value',
  props<{ sortBy: string }>()
);
export const updateUsersTotalCount = createAction(
  '[Users List Page] Update Users Total Count',
  props<{ totalCount: number }>()
);
export const updatePageSize = createAction(
  '[Users List Page] Update Users Page Size',
  props<{ pageSize: number }>()
);
export const updateCurrentPage = createAction(
  '[Users List Page] Update Users Current Page',
  props<{ currentPage: number }>()
);
export const loadUsersBypage = createAction(
  '[Users List Page] Load Users By Page',
  props<{ currentPage: number; pageSize: number }>()
);
