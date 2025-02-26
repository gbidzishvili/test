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
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from './pagination/pagination.component';
import { SortComponent } from './sort/sort.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';
import { FacadeUsersService } from '../../../../core/services/facade-users.service';
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    PaginationComponent,
    SortComponent,
    ListComponent,
    SearchComponent,
  ],
  templateUrl: './users-list.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntlService }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  facadeUsersService = inject(FacadeUsersService);
  usersLoaded = input<string>('');
  users = toSignal(this.facadeUsersService.getAllUsers());

  goToDetails(id: string) {
    this.facadeUsersService.goToDetails(id);
  }
}
