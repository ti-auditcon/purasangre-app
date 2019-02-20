import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], loadChildren: './auth/home/home.module#HomePageModule' },
  { path: 'tutorial', loadChildren: './public/tutorial/tutorial.module#TutorialPageModule' },
  { path: 'perfil', loadChildren: './auth/dashboard/perfil/perfil.module#PerfilPageModule' },
  { path: 'hoydashboard', loadChildren: './auth/dashboard/hoydashboard/hoydashboard.module#HoyDashboardPageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'confirm', loadChildren: './auth/reservas/confirm/confirm.module#ConfirmPageModule' },
  { path: 'forgot', loadChildren: './public/forgot/forgot.module#ForgotPageModule' },
  { path: 'tutorial', loadChildren: './public/tutorial/tutorial.module#TutorialPageModule' },  { path: 'image-modal', loadChildren: './auth/shared/image-modal/image-modal.module#ImageModalPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
