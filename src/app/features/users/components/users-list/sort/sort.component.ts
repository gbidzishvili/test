import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { sortUsers } from '../../../../../state/filter/filter.actions';

interface Filters {
  id: number;
  label: string;
}

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './sort.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  store = inject(Store);
  public http = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isSortMenuOpen = signal(false);
  private apiUrl = environment.apiUrl;
  filters = toSignal(this.fetchFilters());
  fetchFilters() {
    return this.http.get<Filters[]>(`${this.apiUrl}/filters`);
  }
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
  closeSortMenu() {
    this.isSortMenuOpen.set(false);
  }
}
