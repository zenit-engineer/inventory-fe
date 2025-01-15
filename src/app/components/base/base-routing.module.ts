import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from '../statistics/statistics.component';
import { HomeComponent } from '../home/home.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { authGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  { path: 'statistics', component: StatisticsComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] }
];

// Use RouterModule directly for child routes
RouterModule.forChild(routes);
