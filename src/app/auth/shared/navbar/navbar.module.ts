import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NavbarComponent } from './navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {}
