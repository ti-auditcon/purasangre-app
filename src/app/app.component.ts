import { Component, Input } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './services/fcm.service';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private fcm: FcmService,
    private location: Location,
    // private toastr: ToastService,
    public toastController: ToastController
  ) {
    this.initializeApp();
    // Initialize BackButton Eevent.

  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 60000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  // mensajito;
  bodyText;

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.bodyText = JSON.stringify(msg.aps.alert.body);
          this.presentToast(this.bodyText.replace(/\"/g, ""));
          // this.mensajito = msg;
        } else {
          this.presentToast(msg.body);
        }
      });
    }

  initializeApp() {
    this.platform.ready().then(() => {
      this.backButtonEvent();
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      setTimeout(()=>{

      },1000);

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.notificationSetup();
          this.router.navigate(['home']);


        } else {
          this.router.navigate(['login']);

        }
      });
    });
  }

  // active hardware back button
  backButtonEvent(): void {
    const sub = this.platform.backButton.subscribeWithPriority(9999, () => {
      console.log(this.location.path());
      if(this.location.isCurrentPathEqualTo('/home/dashboard'))
      {
        navigator['app'].exitApp();
      } else {
        this.location.back();
      }

    });
  }
}
