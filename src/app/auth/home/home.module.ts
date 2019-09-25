import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home.router.module';

import { HomePage } from './home.page';
import { DashboardPageModule } from '../dashboard/dashboard.module';
import { PerfilPageModule } from '../perfil/perfil.module';
import { HistorialPageModule } from '../plans/historial/historial.module';
import { HoyDashboardPageModule } from '../dashboard/hoydashboard/hoydashboard.module';
import { ClasesPageModule } from '../clases/clases.module';
import { ClasePageModule } from '../clases/clase/clase.module';
import { HoyPageModule } from '../clases/hoy/hoy.module';
import { WodsPageModule } from '../wods/wods.module';
import { ReservasPageModule } from '../reservas/reservas.module';
import { EditHourPageModule } from '../reservas/edit-hour/edit-hour.module';
import { EditConfirmPageModule } from '../reservas/edit-confirm/edit-confirm.module';
import { AddClassPageModule } from '../reservas/add-class/add-class.module';
import { AddDayPageModule } from '../reservas/add-day/add-day.module';
import { AddHourPageModule } from '../reservas/add-hour/add-hour.module';
import { AddConfirmPageModule } from '../reservas/add-confirm/add-confirm.module';
import { PlansPageModule } from '../plans/plans.module';
import { PlanDetailPageModule } from '../plans/plan-detail/plan-detail.module';
import { PlanPaymentPageModule } from '../plans/plan-payment/plan-payment.module';

import { ConfirmPage } from '../reservas/confirm/confirm.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    DashboardPageModule,
    PerfilPageModule,
    HistorialPageModule,
    HoyDashboardPageModule,
    ClasesPageModule,
    ClasePageModule,
    HoyPageModule,
    ReservasPageModule,
    EditHourPageModule,
    AddClassPageModule,
    AddHourPageModule,
    AddDayPageModule,
    AddConfirmPageModule,
    EditConfirmPageModule,
    WodsPageModule,
    PlansPageModule,
    PlanDetailPageModule,
    PlanPaymentPageModule,
  ],
  entryComponents: [
    ConfirmPage
  ],
  declarations: [HomePage, ConfirmPage]
})
export class HomePageModule {}
