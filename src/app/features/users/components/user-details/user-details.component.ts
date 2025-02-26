import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  resource,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { loadAccounts, removeUser } from '../../../../state/users/user.action';
import { environment } from '../../../../environments/environment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddNewAccountComponent } from './components/add-new-account/add-new-account.component';
import { ListComponent } from '../users-list/list/list.component';
import { AccountListComponent } from './components/accounts-list/accounts-list.component';
import { AccountsService } from './services/accounts.service';
import { selectAccounts } from '../../../../state/users/user.selectors';
import { FallbackImageDirective } from '../../../../shared/directives/fallback-image.directive';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    AccountListComponent,
    FallbackImageDirective,
  ],
  templateUrl: './user-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  user = rxResource<User, { id: string }>({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) => {
      return this.usersService.getUserById(request.id);
    },
  });
  @Input() set id(id: string) {
    this.userId.set(id);
    this.accountService.userId.set(id);
  }
  userId = signal<string>('');
  accountService = inject(AccountsService);
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);
  accounts = toSignal(this.store.select(selectAccounts));
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const pendingDialog = this.dialog.open(AddNewAccountComponent, {
      width: '250px',
    });
    pendingDialog.backdropClick().subscribe(() => {
      pendingDialog.close(); // Manually close the dialog
    });
  }
  ngOnInit() {
    this.loadAccounts();
  }
  loadAccounts() {
    this.store.dispatch(loadAccounts());
  }
  removeUser() {
    if (confirm('do you want to delete user?')) {
      this.store.dispatch(removeUser({ id: this.userId() }));
      this.router.navigate(['/users-list']);
    }
  }
  goToDetails(id: string) {
    this.router.navigate([`/edit/${id}`]);
  }
}
