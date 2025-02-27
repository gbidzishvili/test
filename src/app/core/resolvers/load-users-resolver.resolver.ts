import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { loadUsersSuccess } from '../../state/users/user.action';
import { UsersService } from '../../features/users/services/users.service';
import {
  updateCurrentPage,
  updateFilter,
  updatePageSize,
  updateSort,
  updateUsersTotalCount,
} from '../../state/filter/filter.actions';

export const loadUsersResolver: ResolveFn<any> = (route, state) => {
  const usersService = inject(UsersService);
  const store = inject(Store);

  const { _page, _limit, firstname_like, _sort } = route.queryParams;

  if (_page)
    store.dispatch(updateCurrentPage({ currentPage: Number(_page - 1) }));
  if (_limit) store.dispatch(updatePageSize({ pageSize: Number(_limit) }));
  if (firstname_like)
    store.dispatch(updateFilter({ filterBy: firstname_like }));
  if (_sort) store.dispatch(updateSort({ sortBy: _sort }));

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
