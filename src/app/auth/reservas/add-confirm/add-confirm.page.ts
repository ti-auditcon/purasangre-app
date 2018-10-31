import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { ConfirmPage } from '../confirm/confirm.page';

@Component({
  selector: 'app-add-confirm',
  templateUrl: './add-confirm.page.html',
  styleUrls: ['./add-confirm.page.scss'],
})
export class AddConfirmPage implements OnInit {

  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";
  value = "0";

  constructor( public plt: Platform,
               // private alertController: AlertController,
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

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: '¿Reservas esta hora?',
  //     subHeader: '21 de Septiembre de 19:00 a 20:00 hrs',
  //     message: 'Luego tendrás que confirmar tu asistencia a la clase',
  //     buttons: ['Si']
  //   });
  //
  //   await alert.present();
  // }

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


  ngOnInit() {}

}
