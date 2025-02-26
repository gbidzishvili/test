import { createAction, props } from '@ngrx/store';

// pagination
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
