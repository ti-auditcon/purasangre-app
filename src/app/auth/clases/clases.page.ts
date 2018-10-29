import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: 'clases.page.html',
  styleUrls: ['clases.page.scss']
})
export class ClasesPage {

  constructor ( private navCtrl: NavController) {}

  irAClase(){
    // this.router.navigateByUrl( '/home/(clases:clase)' );
    this.navCtrl.navigateForward( '/home/(clases:clase)' );
  }

  irAClaseHoy(){
    this.navCtrl.navigateForward( '/home/(clases:hoy)' );
  }

}
