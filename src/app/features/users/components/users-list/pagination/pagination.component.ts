import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PaginatorIntlService } from './paginator-intl.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/user.model';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './pagination.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
})
export class PaginationComponent {
  http = inject(HttpClient);
  usersService = inject(UsersService);
  currentPage = signal(0);
  pageSize = signal(1);
  length = signal(0);
  public users = this.loadUsers();

  handlePage(pageEvent: PageEvent) {
    this.currentPage.set(pageEvent.pageIndex);
    this.pageSize.set(pageEvent.pageSize);
    this.users = this.loadUsers();
  }

  private loadUsers(): Observable<any[]> {
    const page = this.currentPage();
    const size = this.pageSize();

    return this.http
      .get(`http://localhost:3000/users`, {
        params: {
          _page: `${page + 1}`,
          _limit: `${size}`,
        },
        observe: 'response',
        transferCache: {
          includeHeaders: ['X-Total-Count'],
        },
      })
      .pipe(
        tap((response) => {
          const totalCount = response.headers.get('X-Total-Count');
          if (totalCount !== null) {
            this.length.set(+totalCount);
          }
        }),
        map((response) => (Array.isArray(response.body) ? response.body : []))
      );
  }
}
