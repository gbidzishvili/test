import { Component, inject, Input, resource, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { removeUser } from '../../../../state/users/user.action';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  @Input() set id(id: string) {
    this.userId.set(id);
  }
  userId = signal<string>('');

  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/users`;

  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);
  user = rxResource<User, { id: string }>({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) => {
      return this.usersService.getUserById(request.id);
    },
  });
  ngOnInit() {}
  removeUser() {
    this.store.dispatch(removeUser({ id: this.userId() }));
    // console.log(this.userId);
    // this.router.navigate(['/users-list']);
  }
  updateUser() {
    // this.store.dispatch(
    //   updateUser({
    //     id: 'abca6590-574d-4a76-b398-0e98fb001895',
    //     updateUser: this.userForm.value,
    //   })
    // );
  }
}
