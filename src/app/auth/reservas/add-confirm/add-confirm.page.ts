import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-add-confirm',
  templateUrl: './add-confirm.page.html',
  styleUrls: ['./add-confirm.page.scss'],
})
export class AddConfirmPage implements OnInit {

  buttonFix: string = "";

  constructor( public plt: Platform ) { }

  ngOnInit() {
    // if (this.plt.is('ios')) {
    //   // this.changeClassIOS.classList.add('button-fix-ios');
    //   // This will only print when on iOS
    //   this.buttonFix = "button-fix button-fix-ios";
    //   console.log('Este es un dispositivo iOS');
    // } else {
    //   this.buttonFix = "button-fix";
    // }
  }

}
