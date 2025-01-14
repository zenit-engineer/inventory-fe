import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from '../statistics/statistics.component';
import { authGuard } from 'src/app/guard/auth.guard';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { HomeComponent } from '../home/home.component';
const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [authGuard] // Ensure StatisticsComponent is protected
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
