import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { removeUser } from '../../../../state/users/user.action';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);
  user = toSignal(this.getUsers());
  userId!: string;
  ngOnInit() {}
  getUsers() {
    return this.activatedRoute.params.pipe(
      map((params) => params['id']),
      tap((id) => {
        this.userId = id;
      }),
      switchMap((id) => {
        console.log('id is:', id);
        return this.usersService.getUserById(id); // Return the observable from service
      })
    );
  }
  removeUser() {
    this.store.dispatch(removeUser({ id: this.userId }));
    console.log(this.userId);
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
