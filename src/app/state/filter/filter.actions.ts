import { createAction, props } from '@ngrx/store';

export const updateFilter = createAction(
  '[Users List Page] Update Users Filter Value',
  props<{ filterBy: string }>()
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
