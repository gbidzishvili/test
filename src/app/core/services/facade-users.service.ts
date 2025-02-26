import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheRequestService } from './cache-request.service';
import { User } from '../../features/users/models/user.model';
import { Store } from '@ngrx/store';
import { loadAccounts, removeUser } from '../../state/users/user.action';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddNewAccountComponent } from '../../features/users/components/user-details/components/add-new-account/add-new-account.component';
import { selectAllUsers } from '../../state/users/user.selectors';
import { HttpClient } from '@angular/common/http';
import { Filters } from '../../features/users/models/filter.model';
import { environment } from '../../environments/environment';
import { SortService } from '../../features/users/components/users-list/sort/sort.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeUsersService {
  cacheRequestService = inject(CacheRequestService);
  store = inject(Store);
  router = inject(Router);
  dialog = inject(MatDialog);
  http = inject(HttpClient);
  sortUsersService = inject(SortService);
  private apiUrl = environment.apiUrl;

  getAllUsers() {
    return this.store.select(selectAllUsers);
  }

  loadUserDetails(id: string): Observable<User> {
    return this.cacheRequestService.getUserById(id);
  }
  removeUser(id: string) {
    if (confirm('do you want to delete user?')) {
      this.store.dispatch(removeUser({ id }));
      this.router.navigate(['/users-list']);
    }
  }
  gotoEditPage(id: string) {
    this.router.navigate([`/edit/${id}`]);
  }
  goToDetails(id: string) {
    this.router.navigate([`/user/${id}`]);
  }
  loadAccounts(id) {
    this.store.dispatch(loadAccounts({ id }));
  }
  openDialog() {
    const pendingDialog = this.dialog.open(AddNewAccountComponent, {
      width: '400px',
    });
    pendingDialog.backdropClick().subscribe(() => {
      pendingDialog.close();
    });
  }

  fetchFilters() {
    return this.http.get<Filters[]>(`${this.apiUrl}/filters`);
  }
  sortUsers(label: string) {
    this.sortUsersService.sortUsers(label);
  }
}
