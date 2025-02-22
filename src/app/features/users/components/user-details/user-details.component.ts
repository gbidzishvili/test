import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent {
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);
  user$!: Observable<User>;
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.user$ = this.activatedRoute.params.pipe(
      map((params) => params['id']),
      switchMap((id) => {
        return this.usersService.getUserById(id);
      })
    );
  }
}
