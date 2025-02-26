import { inject, Injectable } from '@angular/core';
import { AccountsService } from '../../features/users/components/user-details/services/accounts.service';
import { Observable } from 'rxjs';
import { Account } from '../../features/users/models/account.model';
import { Store } from '@ngrx/store';
import { selectAccounts } from '../../state/users/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class FacadeAccountService {
  accountService = inject(AccountsService);
  store = inject(Store);
  getAccounts() {
    return this.store.select(selectAccounts);
  }
  loadAllAccounts(id: string): Observable<Account[]> {
    return this.accountService.loadAllAccounts(id);
  }
  setUserId(id: string) {
    this.accountService.userId.set(id);
  }
}
