import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { Store } from '@ngrx/store';
import { removeAccount } from '../../../../../../state/users/user.action';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [],
  templateUrl: './accounts-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent {
  id = input<string>();
  data = input<any[]>();
  cols = input<string[]>();
  store = inject(Store);
  ngOnInit() {
    // this.store.dispatch(loadAllAccounts());
  }
  deleteAccount(id: string) {
    this.store.dispatch(removeAccount({ id }));
  }
}
