import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', canActivate: [AuthGuardService], loadChildren: './auth/home/home.module#HomePageModule' },
  { path: 'perfil', loadChildren: './auth/dashboard/perfil/perfil.module#PerfilPageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  // { path: 'hoy', loadChildren: './auth/clases/hoy/hoy.module#HoyPageModule' },
  // { path: 'add-day', loadChildren: './auth/reservas/add-day/add-day.module#AddDayPageModule' },
  // { path: 'add-confirm', loadChildren: './auth/reservas/add-confirm/add-confirm.module#AddConfirmPageModule' },
  // { path: 'add-hour', loadChildren: './auth/reservas/add-hour/add-hour.module#AddHourPageModule' },
  // { path: 'edit-confirm', loadChildren: './auth/reservas/edit-confirm/edit-confirm.module#EditConfirmPageModule' },
  // { path: 'edit-hour', loadChildren: './auth/reservas/edit-hour/edit-hour.module#EditHourPageModule' },
  // { path: 'clase', loadChildren: './auth/clases/clase/clase.module#ClasePageModule' },
  // { path: 'dashboard', loadChildren: './auth/dashboard/dashboard.module#DashboardPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
