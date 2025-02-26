import { inject, Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, throwError } from 'rxjs';
import { User } from '../../features/users/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CacheRequestService {
  private userCache = new Map<string, Observable<User>>();
  http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/users`;

  getUserById(id: string): Observable<User> {
    if (!this.userCache.has(id)) {
      const request$ = this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
        shareReplay(1),
        catchError(() => {
          this.userCache.delete(id);
          return throwError(() => new Error('User not found'));
        })
      );
      this.userCache.set(id, request$);
    }
    return this.userCache.get(id)!;
  }
}
