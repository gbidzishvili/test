import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/users`;
  // private users$: Observable<User[]> = this.loadAllUsers();
  // public users = toSignal(this.users$, { initialValue: [] });
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
  removeUser(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
