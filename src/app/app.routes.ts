import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { baseRoutes } from './components/base/base.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'activate-account',
    loadComponent: () =>
      import('./components/auth/register/activate-account/activate-account.component').then(
        (m) => m.ActivateAccountComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'two-factor-authentication',
    loadComponent: () =>
      import('./components/auth/register/two-factor-authentication/two-factor-authentication.component').then((m) => m.TwoFactorAuthenticationComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/base/base.component').then((m) => m.BaseComponent),
    canActivate: [authGuard],
    children: [
      ...baseRoutes, // Spread the routes from base.routes.ts
    ],
  },
];
