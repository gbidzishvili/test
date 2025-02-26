import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  delay,
  filter,
  first,
  map,
  take,
  tap,
} from 'rxjs/operators';
import { AppState } from '../../state/app.state';
import {
  selectAllUsers,
  selectUsersLoaded,
} from '../../state/users/user.selectors';
import {
  loadUsersBypage,
  loadUsersSuccess,
} from '../../state/users/user.action';
import { UsersService } from '../../features/users/services/users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectCurrentPage,
  selectPageSize,
} from '../../state/pagination/pagination.selectors';
import {
  updateCurrentPage,
  updatePageSize,
  updateUsersTotalCount,
} from '../../state/pagination/pagination.actions';

export const loadUsersResolver: ResolveFn<any> = (route, state) => {
  const usersService = inject(UsersService);
  const store = inject(Store);
  // const currentPage = toSignal(store.select(selectCurrentPage));
  // const pageSize = toSignal(store.select(selectPageSize));
  let currentPage = route.queryParams['_page'];
  if (currentPage)
    store.dispatch(updateCurrentPage({ currentPage: Number(currentPage) }));
  let pageSize = route.queryParams['_limit'];
  if (pageSize) store.dispatch(updatePageSize({ pageSize: Number(pageSize) }));
  let filter = route.queryParams['firstname_like'];
  let sort = route.queryParams['_sort'];
  // console.log('currentPage', currentPage, pageSize, sort, filter);

  return usersService.loadUsersByPage().pipe(
    tap((response: any) => {
      const users = response.body;
      const totalCount = response['headers'].get('X-Total-Count');
      if (users.length > 0) {
        store.dispatch(
          loadUsersSuccess({
            users: users,
          })
        );
        store.dispatch(updateUsersTotalCount({ totalCount }));
      }
    })
  );
};
