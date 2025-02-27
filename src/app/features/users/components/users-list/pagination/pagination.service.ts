import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadePaginationService } from '../../../../../core/services/facade-pagination.service';
import { Store } from '@ngrx/store';
import { loadUsersBypage } from '../../../../../state/filter/filter.actions';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  addqueryParams(getCurrentPage: number, pagesize: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { _page: getCurrentPage + 1, _limit: pagesize },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
  dispatchLoadUsersByPage(getCurrentPage: number, pagesize: number) {
    this.store.dispatch(
      loadUsersBypage({
        currentPage: getCurrentPage,
        pageSize: pagesize,
      })
    );
  }
}
