import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  inject,
  Injector,
  resource,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginatorIntlService } from './pagination/paginator-intl.service';
import { Store } from '@ngrx/store';
import {
  selectAllUsers,
  selectUsersCount,
} from '../../../../state/users/user.selectors';
import {
  filterUsers,
  loadUsers,
  loadUsersBypage,
  updatePageSize,
} from '../../../../state/users/user.action';
import { toSignal } from '@angular/core/rxjs-interop';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, TooltipDirective],
  templateUrl: './users-list.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class UsersListComponent {
  store = inject(Store);
  usersService = inject(UsersService);
  public router = inject(Router);
  isSortMenuOpen = signal(false);
  currentPage = signal(0);
  pageSize = signal(1);
  userslength = toSignal(this.store.select(selectUsersCount));
  users = toSignal(this.store.select(selectAllUsers));

  ngOnInit() {
    this.store.dispatch(
      loadUsersBypage({
        currentPage: this.currentPage(),
        pageSize: this.pageSize(),
      })
    );
  }

  // getUsers() {
  //   return toObservable(this.filterValue).pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap((query) => this.usersService.loadAllUsers(query))
  //   );
  // }
  updatefilterValue(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.store.dispatch(filterUsers({ filterByValue: filterValue }));
    this.store.dispatch(
      updatePageSize({
        pageSize: this.pageSize(),
      })
    );
  }
  handlePage(pageEvent: PageEvent) {
    this.currentPage.set(pageEvent.pageIndex);
    this.pageSize.set(pageEvent.pageSize);
    this.store.dispatch(
      loadUsersBypage({
        currentPage: this.currentPage(),
        pageSize: this.pageSize(),
      })
    );
  }

  goToDetails(id: string) {
    this.router.navigate([`/user/${id}`]);
  }
}
