import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { sortUsers } from '../../../../../state/filter/filter.actions';
import { FacadeUsersService } from '../../../../../core/services/facade-users.service';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './sort.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent {
  facadeUserService = inject(FacadeUsersService);
  isSortMenuOpen = signal(false);
  filters = toSignal(this.facadeUserService.fetchFilters());

  closeSortMenu() {
    this.isSortMenuOpen.set(false);
  }
}
