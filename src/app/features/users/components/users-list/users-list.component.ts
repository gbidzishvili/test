import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { PaginatorIntlService } from './pagination/paginator-intl.service';
import { Store } from '@ngrx/store';
import { selectAllUsers } from '../../../../state/users/user.selectors';
import { filterUsers } from '../../../../state/users/user.action';
import { toSignal } from '@angular/core/rxjs-interop';
import { TooltipDirective } from '../../../../shared/directives/tooltip.directive';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { PaginationComponent } from './pagination/pagination.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    TooltipDirective,
    ClickOutsideDirective,
    PaginationComponent,
  ],
  templateUrl: './users-list.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class UsersListComponent {
  store = inject(Store);
  usersService = inject(UsersService);
  public router = inject(Router);
  isSortMenuOpen = signal(false);

  users = toSignal(this.store.select(selectAllUsers));

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
  }

  goToDetails(id: string) {
    this.router.navigate([`/user/${id}`]);
  }
  closeSortMenu() {
    console.log('&&&&&');
    this.isSortMenuOpen.set(false);
  }
}
