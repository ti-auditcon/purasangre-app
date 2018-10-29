import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: 'reservas.page.html',
  styleUrls: ['reservas.page.scss']
})
export class ReservasPage {

  buttonFix: string = "";
  // alturaTabBar = document.querySelector('.clase-card');
  // printAlturaBar = this.alturaTabBar.offsetHeight;
  elemento = <HTMLElement>document.querySelector('.sc-ion-tabbar-md-h');
  // altura = this.elemento.offsetHeight;

  // boton = document.querySelector('.buttonFix');

  // constructor( private navCtrl: NavController ) {}
  // changeClassIOS = document.querySelectorAll('.button-fix');

  // @ViewChild('.clase-card') elementView: ElementRef;
  // viewHeight: number;

  constructor( private navCtrl: NavController, public plt: Platform ) {
    // this.viewHeight = this.elementView.nativeElement.offsetHeight;

    if (this.plt.is('ios')) {
      // this.changeClassIOS.classList.add('button-fix-ios');
      // This will only print when on iOS
      this.buttonFix = "button-fix button-fix-ios";
      // console.log('Este es un dispositivo iOS');
    } else {
      this.buttonFix = "button-fix";
      // console.log(this.altura);
    }
  }

  goToEditHour() {
    this.navCtrl.navigateForward( '/home/(reservas:edit-hour)' );
  }
  goToAddDay() {
    this.navCtrl.navigateForward( '/home/(reservas:add-day)' );
  }

}
