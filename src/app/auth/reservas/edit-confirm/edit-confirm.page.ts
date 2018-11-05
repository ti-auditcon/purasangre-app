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
  title;
  message;
  buttonIcon;

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
        custom_id: 1,
        title: 'Reservar esta hora',
        message: 'Viernes 13 de 19:00 a 20:00 hrs',
        buttonIcon: 'information-circle'
      },
      cssClass: 'modal-confirm'
    });
    this.title = modal.componentProps.title;
    this.message = modal.componentProps.message;
    this.buttonIcon = modal.componentProps.buttonIcon;
    return await modal.present();
  }

  async openModalCeder(){
    const modal = await this.modalController.create({
      component: ConfirmPage,
      componentProps: {
        custom_id: 0,
        title: 'Ceder tu Cupo',
        message: 'Si cedes tu cupo podrás reservar en otro horario',
        buttonIcon: 'information-circle'
      },
      cssClass: 'modal-confirm'
    });
    this.title = modal.componentProps.title;
    this.message = modal.componentProps.message;
    this.buttonIcon = modal.componentProps.buttonIcon;
    return await modal.present();
  }

  goToEditHour() {
    this.navCtrl.navigateForward( '/home/(reservas:edit-hour)' );
  }

  ngOnInit() {
  }

}
