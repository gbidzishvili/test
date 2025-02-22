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
  // {
  //   path: 'user/:id',
  //   loadComponent: () => import('./features/users/components/'),
  // },
];
