import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import 'web-animations-js/web-animations.min';

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
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      setTimeout(()=>{
        this.splashScreen.hide();
      },1000);

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
}
