import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HoyPage } from './hoy.page';
import { NavbarModule } from '../../shared/navbar/navbar.module';

const routes: Routes = [
  {
    path: '',
    component: HoyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NavbarModule
  ],
  declarations: [HoyPage]
})
export class HoyPageModule {}
