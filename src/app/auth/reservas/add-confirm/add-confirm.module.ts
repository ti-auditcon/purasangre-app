import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddConfirmPage } from './add-confirm.page';
import { NavbarModule } from '../../shared/navbar/navbar.module';

const routes: Routes = [
  {
    path: '',
    component: AddConfirmPage
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
  declarations: [AddConfirmPage]
})
export class AddConfirmPageModule {}
