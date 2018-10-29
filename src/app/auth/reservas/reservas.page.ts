import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
// import { BottomButtonService } from '../../services/bottombutton.service';

@Component({
  selector: 'app-reservas',
  templateUrl: 'reservas.page.html',
  styleUrls: ['reservas.page.scss']
})
export class ReservasPage {

  buttonFix: string = "";
  // constructor( private navCtrl: NavController ) {}
  // changeClassIOS = document.querySelectorAll('.button-fix');

  constructor( private navCtrl: NavController, public plt: Platform ) {
    if (this.plt.is('ios')) {
      // this.changeClassIOS.classList.add('button-fix-ios');
      // This will only print when on iOS
      this.buttonFix = "button-fix button-fix-ios"
      // console.log('Este es un dispositivo iOS');
    } else {
      this.buttonFix = "button-fix"
    }
  }


  goToEditHour() {
    this.navCtrl.navigateForward( '/home/(reservas:edit-hour)' );
  }
  goToAddDay() {
    this.navCtrl.navigateForward( '/home/(reservas:add-day)' );
  }

}
