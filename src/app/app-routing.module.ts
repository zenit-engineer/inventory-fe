import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { BaseComponent } from './components/base/base.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ActivateAccountComponent } from './components/pages/activate-account/activate-account.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component:BaseComponent,
    loadChildren: ()=> import('./components/base/base.module').then(m => m.BaseModule),
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }