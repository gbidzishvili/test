import { inject, Injectable, signal } from '@angular/core';
import { Account } from '../../../models/account.model';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/accounts`;
  http = inject(HttpClient);
  userId = signal<string>('');
  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}`, account);
  }

  loadAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }
  removeAccount(id: string): Observable<string> {
    return this.http
      .delete<string>(`${this.apiUrl}/${id}`)
      .pipe(tap((v) => console.log('rame', v)));
  }
}
