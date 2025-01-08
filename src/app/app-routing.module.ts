import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guard/auth.guard';
import { BaseComponent } from './base/base.component';

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
    loadChildren: ()=> import('./base/base.module').then(m => m.BaseModule),
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }