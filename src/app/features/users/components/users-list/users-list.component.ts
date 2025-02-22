import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  public users = this.usersService.loadAllUsers();
  ngOnInit() {}
  goToDetails(id: string) {
    this.router.navigate([`/user/${id}`]);
  }
}
