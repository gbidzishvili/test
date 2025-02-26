import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filterUsers } from '../../../../../state/filter/filter.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  filterValue = signal<string>(''); // This will hold the value of the input
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.updateSearchValue();
  }

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
  addqueryParams(filterValue) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { firstname_like: filterValue },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
