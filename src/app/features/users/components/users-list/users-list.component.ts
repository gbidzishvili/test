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
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../models/user.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

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
  filterValue = signal('');
  users = toSignal(this.getUsers());
  ngOnInit() {}
  goToDetails(id: string) {
    this.router.navigate([`/user/${id}`]);
  }
  getUsers() {
    return toObservable(this.filterValue).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => this.usersService.loadAllUsers(query))
    );
  }
  updatefilterValue(event: Event) {
    this.filterValue.set((event.target as HTMLInputElement).value);
    this.usersService.loadAllUsers(this.filterValue());
  }
}
