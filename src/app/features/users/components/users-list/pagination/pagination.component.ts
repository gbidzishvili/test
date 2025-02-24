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
import { loadUsersBypage } from '../../../../../state/users/user.action';

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
  pageSize = signal(1);
  userslength = toSignal(this.store.select(selectUsersCount));

  ngOnInit(): void {
    this.dispatchLoadUsersByPage();
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
