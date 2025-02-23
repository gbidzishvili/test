import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  inject,
  Injector,
  resource,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
  http = inject(HttpClient);
  usersService = inject(UsersService);
  public router = inject(Router);
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/users`;
  users = toSignal(this.usersService.loadAllUsers());

  // public users = this.usersService.loadAllUsers();
  filterValue = signal('');
  // users = resource<User[], { filterValue: string }>({
  //   request: () => ({ filterValue: this.filterValue() }),
  //   loader: async ({ request, abortSignal }) => {
  //     const us = await fetch(
  //       `${this.apiUrl}?firstName_like=^${request.filterValue}`,
  //       { signal: abortSignal }
  //     );
  //     return await us.json();
  //   },
  // });
  ngOnInit() {
    // this.users = toSignal(this.usersService.loadAllUsers(), {
    //   injector: this.injector,
    // });
    // let url = `${this.apiUrl}?firstName_like=saba`;
    // console.log('url is:', url);
    // this.http.get(url).subscribe((v) => console.log('rame ', v));
  }
  goToDetails(id: string) {
    this.router.navigate([`/user/${id}`]);
  }
  updatefilterValue(event: Event) {
    // filterValue.set($any($event.target).value);
    this.filterValue.set((event.target as HTMLInputElement).value);
    console.log('filterValue', this.filterValue());
    this.usersService.loadAllUsers(this.filterValue());
  }
}
