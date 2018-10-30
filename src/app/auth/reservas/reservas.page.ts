import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
// import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reservas',
  templateUrl: 'reservas.page.html',
  styleUrls: ['reservas.page.scss']
})
export class ReservasPage {

  buttonFix: string = "";
  // buttonFixAndroid: any = "";

  // divToChange = <HTMLElement>document.getElementById('button-fix');

  // alturaSinTabBar:any;
  // variable = "inherit";

  // alturaTabBar = document.querySelector('.clase-card');
  // printAlturaBar = this.alturaTabBar.offsetHeight;
  // elemento = <HTMLElement>document.querySelector('.card-alert');
  // altura = this.elemento.offsetHeight;

  // boton = document.querySelector('.buttonFix');

  // constructor( private navCtrl: NavController ) {}
  // changeClassIOS = document.querySelectorAll('.button-fix');

  // @ViewChild('.clase-card') elementView: ElementRef;
  // viewHeight: number;

  constructor( private navCtrl: NavController, public plt: Platform ) {

    // plt.ready().then((readySource) => {
    //   // console.log('Width: ' + plt.width());
    //   console.log('Height: ' + plt.height());
    //   console.log(plt.height() - 56);
    //
    //   let alturaSinTabBar = this.plt.height() -56;
    //
    // });

    // if (this.plt.is('ios')) {
    //   this.buttonFix = "button-fix button-fix-ios";
    // } else {
    //   this.buttonFix = "button-fix";
    // }
  }

  goToEditHour() {
    this.navCtrl.navigateForward( '/home/(reservas:edit-hour)' );
  }
  goToAddDay() {
    this.navCtrl.navigateForward( '/home/(reservas:add-day)' );
  }

}
