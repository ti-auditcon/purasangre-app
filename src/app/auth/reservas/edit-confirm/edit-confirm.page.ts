import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { ConfirmPage } from '../confirm/confirm.page';

@Component({
  selector: 'app-edit-confirm',
  templateUrl: './edit-confirm.page.html',
  styleUrls: ['./edit-confirm.page.scss'],
})
export class EditConfirmPage implements OnInit {

  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";
  value;

  constructor( public plt: Platform,
               private modalController: ModalController,
               private navCtrl: NavController ) {

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
        custom_id: "confirm"
      },
      cssClass: 'modal-confirm'
    });
    this.value = modal.componentProps.custom_id;
    console.log(this.value);
    return await modal.present();
  }

  async openModalCeder(){
    const modal = await this.modalController.create({
      component: ConfirmPage,
      componentProps: {
        custom_id: "ceder"
      },
      cssClass: 'modal-confirm'
    });
    this.value = modal.componentProps.custom_id;
    console.log(this.value);
    return await modal.present();
  }

  goToEditHour() {
    this.navCtrl.navigateForward( '/home/(reservas:edit-hour)' );
  }

  ngOnInit() {
  }

}
