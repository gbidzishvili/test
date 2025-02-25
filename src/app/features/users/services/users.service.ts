import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectPageSize } from '../../../state/users/user.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/users`;
  private store = inject(Store);
  private pageSize = toSignal(this.store.select(selectPageSize));
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
  loadUsersByPage(currentPage: number, pageSize: number) {
    return this.http.get(`http://localhost:3000/users`, {
      params: {
        _page: `${currentPage + 1}`,
        _limit: `${pageSize}`,
      },
      observe: 'response',
      transferCache: {
        includeHeaders: ['X-Total-Count'],
      },
    });
  }
  filterUsers(value: string) {
    return this.http.get<User[]>(`${this.apiUrl}`, {
      params: { firstName_like: `^${value}`, _limit: this.pageSize() },
    });
  }
  sortUsers(label: string) {
    console.log('lableis:', label);
    return this.http.get<User[]>(`${this.apiUrl}`, {
      params: { _sort: label, _limit: this.pageSize() },
    });
  }
  removeUser(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
