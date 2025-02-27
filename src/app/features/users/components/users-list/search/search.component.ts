import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filterUsers } from '../../../../../state/filter/filter.actions';
import { SearchService } from './search.service';
import { FacadeUsersService } from '../../../../../core/services/facade-users.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  facadeUserService = inject(FacadeUsersService);
  ngOnInit(): void {
    this.facadeUserService.updateSearchValue();
  }

  updatefilterValue(event: Event) {
    this.facadeUserService.updatefilterValue(event);
  }
}
