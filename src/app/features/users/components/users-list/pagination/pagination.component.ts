import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginatorIntlService } from './paginator-intl.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { loadUsersBypage } from '../../../../../state/users/user.action';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import {
  selectCurrentPage,
  selectPageSize,
  selectUsersCount,
} from '../../../../../state/pagination/pagination.selectors';
import {
  updateCurrentPage,
  updatePageSize,
} from '../../../../../state/pagination/pagination.actions';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './pagination.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  store = inject(Store);
  currentPage = toSignal(this.store.select(selectCurrentPage));
  pageSize = toSignal(this.store.select(selectPageSize));
  userslength = toSignal(this.store.select(selectUsersCount));
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  handlePage(pageEvent: PageEvent) {
    this.store.dispatch(
      updateCurrentPage({ currentPage: pageEvent.pageIndex })
    );
    this.store.dispatch(updatePageSize({ pageSize: pageEvent.pageSize }));
    this.addqueryParams();
    this.dispatchLoadUsersByPage();
  }
  addqueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { _page: this.currentPage(), _limit: this.pageSize() },
      queryParamsHandling: 'merge', // Preserve other query parameters
    });
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
