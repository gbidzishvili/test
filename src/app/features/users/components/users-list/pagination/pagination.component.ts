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
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import {
  selectCurrentPage,
  selectPageSize,
  selectUsersCount,
} from '../../../../../state/filter/filter.selectors';
import {
  loadUsersBypage,
  updateCurrentPage,
  updatePageSize,
} from '../../../../../state/filter/filter.actions';
import { PaginationService } from './pagination.service';
import { FacadePaginationService } from '../../../../../core/services/facade-pagination.service';

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
  facadePaginationService = inject(FacadePaginationService);
  currentPage = toSignal(this.facadePaginationService.getCurrentPage());
  pageSize = toSignal(this.facadePaginationService.getPageSize());
  userslength = toSignal(this.facadePaginationService.getUsersLength());
  paginationService = inject(PaginationService);
  handlePage(pageEvent: PageEvent) {
    this.store.dispatch(
      updateCurrentPage({ currentPage: pageEvent.pageIndex })
    );
    this.store.dispatch(updatePageSize({ pageSize: pageEvent.pageSize }));
    this.paginationService.addqueryParams(this.currentPage(), this.pageSize());
    this.paginationService.dispatchLoadUsersByPage(
      this.currentPage(),
      this.pageSize()
    );
  }
}
