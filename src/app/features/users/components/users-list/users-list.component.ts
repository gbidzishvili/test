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
import { selectAllUsers } from '../../../../state/users/user.selectors';
import { loadUsers } from '../../../../state/users/user.action';
import { StatusEnum } from '../../../../state/enums/status.enums';
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
  http = inject(HttpClient);
  usersService = inject(UsersService);
  public router = inject(Router);
  filterValue = signal('');

  isSortMenuOpen = signal(false);
  currentPage = signal(0);
  pageSize = signal(1);
  length = signal(0);
  users = toSignal(this.store.select(selectAllUsers));

  ngOnInit() {
    this.store.dispatch(loadUsers());
    // this.store
    //   .select(selectAllUsers)
    //   .subscribe((v) => console.log('v**********8:', v));
  }
  goToDetails(id: string) {
    this.router.navigate([`/user/${id}`]);
  }
  // getUsers() {
  //   return toObservable(this.filterValue).pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap((query) => this.usersService.loadAllUsers(query))
  //   );
  // }
  // updatefilterValue(event: Event) {
  //   this.filterValue.set((event.target as HTMLInputElement).value);
  //   this.usersService.loadAllUsers(this.filterValue());
  // }
  handlePage(pageEvent: PageEvent) {
    // this.currentPage.set(pageEvent.pageIndex);
    // this.pageSize.set(pageEvent.pageSize);
    // this.users = this.loadUsers();
  }
  // private loadUsers(): Observable<any[]> {
  //   const page = this.currentPage();
  //   const size = this.pageSize();

  //   return this.http
  //     .get(`http://localhost:3000/users`, {
  //       params: {
  //         _page: `${page + 1}`,
  //         _limit: `${size}`,
  //       },
  //       observe: 'response',
  //       transferCache: {
  //         includeHeaders: ['X-Total-Count'],
  //       },
  //     })
  //     .pipe(
  //       tap((response) => {
  //         const totalCount = response.headers.get('X-Total-Count');
  //         if (totalCount !== null) {
  //           this.length.set(+totalCount);
  //         }
  //       }),
  //       map((response) => (Array.isArray(response.body) ? response.body : []))
  //     );
  // }
}
