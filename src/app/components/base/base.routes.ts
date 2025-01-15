import { Routes } from '@angular/router';
import { authGuard } from 'src/app/guard/auth.guard';

export const baseRoutes: Routes = [
  {
    path: 'statistics',
    loadComponent: () =>
      import('../statistics/statistics.component').then((m) => m.StatisticsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('../change-password/change-password.component').then((m) => m.ChangePasswordComponent),
    canActivate: [authGuard],
  },
];
