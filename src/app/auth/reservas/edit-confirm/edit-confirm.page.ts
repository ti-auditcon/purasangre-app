import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { ConfirmPage } from '../confirm/confirm.page';

@Component({
  selector: 'app-edit-confirm',
  templateUrl: './edit-confirm.page.html',
  styleUrls: ['./edit-confirm.page.scss'],
})
export class EditConfirmPage implements OnInit {

  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";
  value = "0";

  constructor( public plt: Platform,
               private modalController: ModalController ) {

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

  async openModal(){
    const modal = await this.modalController.create({
      component: ConfirmPage,
      componentProps: {
        custom_id: this.value
      },
      cssClass: 'modal-confirm'
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
