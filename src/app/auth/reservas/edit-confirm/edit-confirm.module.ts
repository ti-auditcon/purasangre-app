import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditConfirmPage } from './edit-confirm.page';
import { NavbarModule } from '../../shared/navbar/navbar.module';

const routes: Routes = [
  {
    path: '',
    component: EditConfirmPage
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
  declarations: [EditConfirmPage]
})
export class EditConfirmPageModule {}
