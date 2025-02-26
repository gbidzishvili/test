import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  selectCurrentPage,
  selectFilterValue,
  selectPageSize,
  selectSortValue,
} from '../../../state/filter/filter.selectors';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/users`;
  private store = inject(Store);
  private pageSize = toSignal(this.store.select(selectPageSize));
  private currentPage = toSignal(this.store.select(selectCurrentPage));
  sortBy = toSignal(this.store.select(selectSortValue));
  filter = toSignal(this.store.select(selectFilterValue));
  constructor(private http: HttpClient) {}
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
  loadAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  loadUsersByPage() {
    let params = new HttpParams()
      .set('_page', `${this.currentPage() + 1}`)
      .set('_limit', this.pageSize())
      .set('_sort', this.sortBy())
      .set('firstname_like', this.filter());
    console.log('sortBy', this.sortBy(), this.filter());
    return this.http.get(`${this.apiUrl}`, {
      params,
      observe: 'response',
      transferCache: {
        includeHeaders: ['X-Total-Count'],
      },
    });
  }
  filterUsers(value: string) {
    return this.http.get<User[]>(`${this.apiUrl}`, {
      params: { firstname_like: `^${value}`, _limit: this.pageSize() },
    });
  }
  sortUsers(label: string) {
    return this.http.get<User[]>(`${this.apiUrl}`, {
      params: {
        _sort: label,
        _page: this.currentPage() + 1,
        _limit: this.pageSize(),
      },
    });
  }
  removeUser(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
