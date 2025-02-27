import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  signal,
} from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FallbackImageDirective } from '../../../../shared/directives/fallback-image.directive';
import { FacadeUsersService } from '../../../../core/services/facade-users.service';
import { FacadeAccountService } from '../../../../core/services/facade-account.service';
import { AccountListComponent } from './components/accounts-list/accounts-list.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, AccountListComponent, FallbackImageDirective],
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  user = rxResource<User, { id: string }>({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) => {
      return this.http.get<User>(`${this.apiUrl}/users/${request.id}`);
    },
  });
  @Input() set id(id: string) {
    this.userId.set(id);
    this.facadeAccountService.setUserId(id);
  }
  facadeAccountService = inject(FacadeAccountService);
  facadeUserService = inject(FacadeUsersService);
  userId = signal<string>('');
  accounts = toSignal(this.facadeAccountService.getAccounts());

  openDialog(): void {
    this.facadeUserService.openDialog();
  }
  ngOnInit() {
    this.loadData(this.userId());
  }
  loadData(id: string) {
    this.facadeUserService.loadUserDetails(id);
    this.facadeUserService.loadAccounts(id);
  }
  removeUser() {
    this.facadeUserService.removeUser(this.userId());
  }
  goToEditPage(id: string) {
    this.facadeUserService.gotoEditPage(id);
  }
}
