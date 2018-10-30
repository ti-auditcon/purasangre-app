import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-edit-confirm',
  templateUrl: './edit-confirm.page.html',
  styleUrls: ['./edit-confirm.page.scss'],
})
export class EditConfirmPage implements OnInit {

  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";

  constructor( public plt: Platform ) {

    if (this.plt.is('ios')) {
      //Si es iOS
      this.buttonFixIOS = "button-fix-ios";
      this.buttonFixAndroid = "display-none";
    } else {
      //Si es Android
      this.buttonFixIOS = "display-none";
      this.buttonFixAndroid = "button-fix";
    }

  }

  ngOnInit() {
  }

}
