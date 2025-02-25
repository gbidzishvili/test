import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginatorIntlService } from './paginator-intl.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUsersCount } from '../../../../../state/users/user.selectors';
import {
  loadUsersBypage,
  loadUsersSuccess,
} from '../../../../../state/users/user.action';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './pagination.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class PaginationComponent implements OnInit {
  store = inject(Store);
  currentPage = signal(0);
  pageSize = signal(10);
  userslength = toSignal(this.store.select(selectUsersCount));
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // this.dispatchLoadUsersByPage();
    // this.activatedRoute.data
    //   .pipe(
    //   tap((response) => {
    //     const users = response['usersLoaded']['body'];
    //     const totalCount =
    //       response['usersLoaded']['headers'].get('X-Total-Count');
    //     if (users.length > 0) {
    //       this.store.dispatch(
    //         loadUsersSuccess({
    //           users: users,
    //           count: 17,
    //         })
    //       );
    //     }
    //   })
    // )
    // .subscribe();
  }
  handlePage(pageEvent: PageEvent) {
    this.currentPage.set(pageEvent.pageIndex);
    this.pageSize.set(pageEvent.pageSize);
    this.dispatchLoadUsersByPage();
  }
  dispatchLoadUsersByPage() {
    this.store.dispatch(
      loadUsersBypage({
        currentPage: this.currentPage(),
        pageSize: this.pageSize(),
      })
    );
  }
}
