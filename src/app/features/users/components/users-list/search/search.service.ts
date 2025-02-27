import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filterUsers } from '../../../../../state/filter/filter.actions';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  router = inject(Router);
  route = inject(ActivatedRoute);
  filterValue = signal<string>('');
  store = inject(Store);

  updateSearchValue() {
    this.route.queryParams.subscribe((params) => {
      const searchValue = params['firstname_like'];
      if (searchValue) {
        this.filterValue.set(searchValue);
      }
    });
  }
  updatefilterValue(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.addqueryParams(filterValue);
    this.store.dispatch(filterUsers({ filterByValue: filterValue }));
  }
  addqueryParams(filterValue: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { firstname_like: filterValue },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
