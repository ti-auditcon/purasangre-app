import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlansPage } from './plans.page';
import { NavbarModule } from '../shared/navbar/navbar.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarModule,
    RouterModule.forChild([{ path: '', component: PlansPage }])
  ],
  declarations: [PlansPage]
})
export class PlansPageModule {}
