import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { NavController, ModalController } from '@ionic/angular';
import { ConfirmPage } from '../confirm/confirm.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerCredentials = { email: '', password: '' };
  error:any = '';

  title;
  message;
  buttonIcon;

//  alert: string = this.storage.get('alert');

  constructor( private authService: AuthenticationService,
               private storage: Storage,
               private modalController: ModalController,
               private navCtrl: NavController ) { }

  ngOnInit() {

  }

  login() {

    this.authService.login(this.registerCredentials)
    .then(data => {
          console.log(data);
        })
    .catch(async e => {
      console.log(e);
      console.log(this.error.error );
      console.log(this.error.message );
      this.error = e.error;
      const modal = await this.modalController.create({
        component: ConfirmPage,
        componentProps: {
          title: this.error.hint,
          message: this.error.message,
          buttonIcon: 'close-circle'
        },
        cssClass: 'modal-confirm'
      });
      this.title = modal.componentProps.title;
      this.message = modal.componentProps.message;
      this.buttonIcon = modal.componentProps.buttonIcon;
      return await modal.present();
    });


  }

  goToForgot() {
    this.navCtrl.navigateForward( '/forgot' );
  }

}
