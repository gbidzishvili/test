import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users-list', pathMatch: 'full' },
  {
    path: 'users-list',
    loadComponent: () =>
      import(
        './features/users/components/users-list/users-list.component'
      ).then((c) => c.UsersListComponent),
  },
  {
    path: 'add-user',
    loadComponent: () =>
      import('./features/users/components/add-user/add-user.component').then(
        (c) => c.AddUserComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./features/users/components/add-user/add-user.component').then(
        (c) => c.AddUserComponent
      ),
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import(
        './features/users/components/user-details/user-details.component'
      ).then((c) => c.UserDetailsComponent),
  },
  {
    path: 'pagination',
    loadComponent: () =>
      import(
        './features/users/components/users-list/pagination/pagination.component'
      ).then((c) => c.PaginationComponent),
  },
];
