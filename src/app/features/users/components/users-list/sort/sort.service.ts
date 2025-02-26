import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { sortUsers } from '../../../../../state/filter/filter.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(Store);
  sortUsers(label: string) {
    this.addqueryParams(label);
    this.store.dispatch(sortUsers({ sortLabel: label }));
  }
  addqueryParams(label) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { _sort: label },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
