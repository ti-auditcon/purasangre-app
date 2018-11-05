import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerCredentials = { email: '', password: '' };
//  alert: string = this.storage.get('alert');

  constructor( private authService: AuthenticationService,
               private storage: Storage,
               private navCtrl: NavController ) { }

  ngOnInit() {
  }

  login() {
   this.authService.login(this.registerCredentials);
  }

  goToForgot() {
    this.navCtrl.navigateForward( '/forgot' );
  }

}
