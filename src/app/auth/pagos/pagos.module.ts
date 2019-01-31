import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagosPage } from './pagos.page';
import { NavbarModule } from '../shared/navbar/navbar.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NavbarModule,
    RouterModule.forChild([{ path: '', component: PagosPage }])
  ],
  declarations: [PagosPage]
})
export class PagosPageModule {}
