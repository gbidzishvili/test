import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'add-user', pathMatch: 'full' },
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
    path: 'users-list',
    loadComponent: () =>
      import(
        './features/users/components/users-list/users-list.component'
      ).then((c) => c.UsersListComponent),
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import(
        './features/users/components/user-details/user-details.component'
      ).then((c) => c.UserDetailsComponent),
  },
];
