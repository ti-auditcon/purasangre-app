import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImageModalPage } from './image-modal.page';
import { NavbarModule } from '../navbar/navbar.module';

const routes: Routes = [
  {
    path: '',
    component: ImageModalPage
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
  declarations: [ImageModalPage]
})
export class ImageModalPageModule {}
