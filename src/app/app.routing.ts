import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
    //canActivate: [AuthGuard] 
  },
  { path: 'login',           component: LoginComponent,

},
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
      // canActivate: [AuthGuard],
  }],
},
  {
    path: '**',
    redirectTo: 'news',
  }
]
