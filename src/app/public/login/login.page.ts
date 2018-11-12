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
  error:any = '';

//  alert: string = this.storage.get('alert');

  constructor( private authService: AuthenticationService,
               private storage: Storage,
               private navCtrl: NavController ) { }

  ngOnInit() {
    alert = this.authService.lastError();
    console.log(alert);
  }

  login() {

    this.authService.login(this.registerCredentials)
    .then(data => {
          console.log(data);
        })
    .catch(e => {
        console.log(e);
        this.error = e.error;
        console.log(this.error.error );
        console.log(this.error.message );
    });


  }

  goToForgot() {
    this.navCtrl.navigateForward( '/forgot' );
  }

}
