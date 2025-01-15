import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ActivateAccountComponent } from './components/auth/activate-account/activate-account.component';
import { BaseComponent } from './components/base/base.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: '', 
    component: BaseComponent, 
    loadChildren: () => import('./components/base/base.component').then(m => m.BaseComponent),
    canActivate: [authGuard]
  }
];

// Use RouterModule directly in the standalone components
RouterModule.forRoot(routes);
