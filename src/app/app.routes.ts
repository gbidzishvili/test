import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'add-client', pathMatch: 'full' },
  {
    path: 'add-client',
    loadComponent: () =>
      import('./features/users/components/add-user/add-user.component').then(
        (c) => c.AddUserComponent
      ),
  },
];
