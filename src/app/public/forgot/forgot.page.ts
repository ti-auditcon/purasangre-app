import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { ConfirmPage } from '../confirm/confirm.page';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  registerCredentials = { email: '' };

  title;
  message;
  buttonIcon;

  constructor( private authService: AuthenticationService,
               private modalController: ModalController,
               private navCtrl: NavController ) { }

  async openModalForgot(){
   const modal = await this.modalController.create({
     component: ConfirmPage,
     componentProps: {
       title: 'Revisa tu Correo',
       message: 'Te hemos enviado las instrucciones para reestablecer tu contraseña',
       buttonIcon: 'checkmark-circle'
     },
     cssClass: 'modal-confirm'
   });
   this.title = modal.componentProps.title;
   this.message = modal.componentProps.message;
   this.buttonIcon = modal.componentProps.buttonIcon;
   return await modal.present();
  }

  ngOnInit() {
  }

  login(){}

  backToLogin(){
    this.navCtrl.navigateBack( '/login' )
  }

}
