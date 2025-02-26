import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { PaginatorIntlService } from './pagination/paginator-intl.service';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../../../../state/users/user.selectors';
import { filterUsers } from '../../../../state/users/user.action';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from './pagination/pagination.component';
import { SortComponent } from './sort/sort.component';
import { ListComponent } from './list/list.component';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,

    PaginationComponent,
    SortComponent,
    ListComponent,
  ],
  templateUrl: './users-list.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  usersLoaded = input<string>('');

  store = inject(Store);
  usersService = inject(UsersService);
  public router = inject(Router);
  users = toSignal(this.store.select(selectAllUsers));
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
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
      replaceUrl: true, // Preserve other query parameters
    });
  }

  goToDetails(id: string) {
    this.router.navigate([`/user/${id}`]);
  }
}
// getUsers() {
//   return toObservable(this.filterValue).pipe(
//     debounceTime(500),
//     distinctUntilChanged(),
//     switchMap((query) => this.usersService.loadAllUsers(query))
//   );
// }
