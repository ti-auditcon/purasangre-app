import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-add-confirm',
  templateUrl: './add-confirm.page.html',
  styleUrls: ['./add-confirm.page.scss'],
})
export class AddConfirmPage implements OnInit {

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

  ngOnInit() {}

}
