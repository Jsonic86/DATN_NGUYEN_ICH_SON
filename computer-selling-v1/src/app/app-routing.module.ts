import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './guard/auth.guard';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'auth/login',
//     pathMatch: 'full'
//   },
//   {
//     path: 'auth',
//     loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
//   },
//   {
//     path: 'users',
//     loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
//   }
// ];
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' },
    children: [
      // { path: 'home', loadChildren: () => import('./layouts/user-layout/user-layout.module').then(m => m.UserLayoutModule) }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
    children: [
      // { path: 'dashboard', loadChildren: () => import('./admin/dashboard.module').then(m => m.DashboardModule) }
    ]
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  { path: '**', redirectTo: 'auth/login' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
