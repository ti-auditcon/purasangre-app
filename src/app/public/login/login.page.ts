import { Component } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ConfirmPage } from '../confirm/confirm.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  registerCredentials = { email: '', password: '' };
  error:any = '';

  title;
  message;
  buttonIcon;

//  alert: string = this.storage.get('alert');

  constructor( private authService: AuthenticationService,
               private storage: Storage,
               private router: Router,
               private modalController: ModalController ) { }

  ionViewDidEnter() {
    console.log('en el login');
    if(this.authService.isAuthenticated())
    {
      console.log('auth voy al home');
      this.router.navigate(['/home/']);
    } else { console.log('no auth');}

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
          title: 'Error',
          message: 'Usuario o contraseña incorrectos.',
          buttonIcon: '/assets/icon/close.svg'
        },
        cssClass: 'modal-confirm'
      });
      // this.title = modal.componentProps.title;
      // this.message = modal.componentProps.message;
      // this.buttonIcon = modal.componentProps.buttonIcon;
      return await modal.present();
    });


  }

  goToForgot() {
    this.router.navigate( ['/forgot'] );
  }

}
