import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-edit-confirm',
  templateUrl: './edit-confirm.page.html',
  styleUrls: ['./edit-confirm.page.scss'],
})
export class EditConfirmPage implements OnInit {

  buttonFix: string = "";

  constructor( public plt: Platform ) {
    if (this.plt.is('ios')) {
      // this.changeClassIOS.classList.add('button-fix-ios');
      // This will only print when on iOS
      this.buttonFix = "button-fix button-fix-ios"
      // console.log('Este es un dispositivo iOS');
    } else {
      this.buttonFix = "button-fix"
    }
  }

  ngOnInit() {
  }

}
