import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCurrentPage,
  selectPageSize,
  selectUsersCount,
} from '../../state/filter/filter.selectors';
import { PaginationService } from '../../features/users/components/users-list/pagination/pagination.service';

@Injectable({
  providedIn: 'root',
})
export class FacadePaginationService {
  store = inject(Store);
  paginationService = inject(PaginationService);
  getCurrentPage() {
    return this.store.select(selectCurrentPage);
  }
  getPageSize() {
    return this.store.select(selectPageSize);
  }
  getUsersLength() {
    return this.store.select(selectUsersCount);
  }
}
