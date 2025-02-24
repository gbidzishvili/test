import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { sortUsers } from '../../../../../state/users/user.action';
import { Store } from '@ngrx/store';

interface Filters {
  id: number;
  label: string;
}

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './sort.component.html',
})
export class SortComponent {
  store = inject(Store);
  public http = inject(HttpClient);
  isSortMenuOpen = signal(false);
  private apiUrl = environment.apiUrl;
  filters = toSignal(this.fetchFilters());

  fetchFilters() {
    return this.http.get<Filters[]>(`${this.apiUrl}/filters`);
  }
  sortUsers(label: string) {
    this.store.dispatch(sortUsers({ sortLabel: label }));
  }
  closeSortMenu() {
    this.isSortMenuOpen.set(false);
  }
}
