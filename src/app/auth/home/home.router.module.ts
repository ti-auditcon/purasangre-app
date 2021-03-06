import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { DashboardPage } from '../dashboard/dashboard.page';
import { PerfilPage } from '../perfil/perfil.page';
import { HistorialPage } from '../plans/historial/historial.page';
import { HoyDashboardPage } from '../dashboard/hoydashboard/hoydashboard.page';
import { ClasesPage } from '../clases/clases.page';
import { ClasePage } from '../clases/clase/clase.page';
import { HoyPage } from '../clases/hoy/hoy.page';
import { WodsPage } from '../wods/wods.page';
import { ReservasPage } from '../reservas/reservas.page';
import { EditHourPage } from '../reservas/edit-hour/edit-hour.page';
import { AddClassPage } from '../reservas/add-class/add-class.page';
import { AddDayPage } from '../reservas/add-day/add-day.page';
import { AddHourPage } from '../reservas/add-hour/add-hour.page';
import { AddConfirmPage } from '../reservas/add-confirm/add-confirm.page';
import { EditConfirmPage } from '../reservas/edit-confirm/edit-confirm.page';
import { PlansPage } from '../plans/plans.page';
import { FlowPage } from '../flow/flow.page';
import { PlanDetailPage } from '../plans/plan-detail/plan-detail.page';
import { PlanPaymentPage } from '../plans/plan-payment/plan-payment.page';
import { AuthGuardService } from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home', canActivate: [AuthGuardService], component: HomePage, children: [
      { path: '', redirectTo: '/home/dashboard', pathMatch: 'full', },

      // { path: 'dashboard', outlet: 'dashboard', component: DashboardPage },
      { path: 'dashboard', children: [{ path: '', component: DashboardPage }] },

      // { path: 'perfil', outlet: 'dashboard', component: PerfilPage },
      { path: 'perfil', children: [{ path: '', component: PerfilPage }] },
      // { path: 'hoydashboard', outlet: 'dashboard', component: HoyDashboardPage },
      { path: 'hoydashboard', children: [{ path: '', component: HoyDashboardPage }] },

      // { path: 'clases', outlet: 'clases', component: ClasesPage },
      { path: 'clases', children: [{ path: '', component: ClasesPage }] },
      // { path: 'clase/:id', outlet: 'clases', component: ClasePage },
      { path: 'clase/:id', children: [{ path: '', component: ClasePage }] },
      // { path: 'hoy', outlet: 'clases', component: HoyPage },
      { path: 'hoy', children: [{ path: '', component: HoyPage }] },
      { path: 'wods/:id', children: [{ path: '', component: WodsPage }] },
      // { path: 'reservas', outlet: 'reservas', component: ReservasPage },
      { path: 'reservas', children: [{ path: '', component: ReservasPage }] },
      // { path: 'edit-hour/:date', outlet: 'reservas', component: EditHourPage },
      { path: 'edit-hour/:date', children: [{ path: '', component: EditHourPage }] },
      // { path: 'edit-confirm/:id', outlet: 'reservas', component: EditConfirmPage },
      { path: 'edit-confirm/:id', children: [{ path: '', component: EditConfirmPage }] },
      // { path: 'add-day', outlet: 'reservas', component: AddDayPage },
      { path: 'clase-type', children: [{ path: '', component: AddClassPage }] },
      { path: 'clase-type/:clasetype/add-day', children: [{ path: '', component: AddDayPage }] },
      // { path: 'add-hour/:date', outlet: 'reservas', component: AddHourPage },
      { path: 'clase-type/:clasetype/add-day/:date', children: [{ path: '', component: AddHourPage }] },
      // { path: 'add-confirm/:id', outlet: 'reservas', component: AddConfirmPage },
      { path: 'add-confirm/:id', children: [{ path: '', component: AddConfirmPage }] },

      // { path: 'plans', outlet: 'plans', component: PlansPage }
      { path: 'plans', children: [{ path: '', component: PlansPage }] },
      { path: 'plan-detail/:id', children: [{ path: '', component: PlanDetailPage }] },
      { path: 'pay-historial', children: [{ path: '', component: HistorialPage }] },
      { path: 'plan-payment', children: [{ path: '', component: PlanPaymentPage }] },
      { path: 'plan-flow/:id', children: [{ path: '', component: FlowPage }] },
      // { path: 'plan-flow/:planflow', loadChildren: './auth/flow/flow.module#FlowPageModule' },
    ]}
    // { path: '', redirectTo: '/home/dashboard', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
