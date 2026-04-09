import { Routes } from '@angular/router';

import { AuthPageComponent } from './pages/auth/auth-page.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { OauthSuccessPageComponent } from './pages/oauth-success/oauth-success-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: AuthPageComponent
  },
  {
    path: 'oauth-success',
    component: OauthSuccessPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
