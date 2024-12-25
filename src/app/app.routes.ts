import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './pages/auth/components/auth-layout/auth-layout.component';
import { AuthGuard } from './pages/auth/services/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { DashboardLayoutComponent } from './pages/dashboard/components/dashboard-layout/dashboard-layout.component';
import { NoAuthGuard } from './pages/auth/services/no-auth.gaurd';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
    ],
    canActivate: [AuthGuard],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/auth/signup/signup.component').then(
            (c) => c.SignupComponent
          ),
      },
    ],
    canActivate: [NoAuthGuard],
  },
  {
    path: '**', // Wildcard route to catch all undefined routes
    redirectTo: '', // Redirect to the home page (or any other desired path)
  },
];

RouterModule.forRoot(routes, {
  // preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
});
