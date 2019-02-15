import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {

  constructor(private storage: Storage,
              private router: Router,
              private firebase: Firebase,
              private splashScreen: SplashScreen,
              public toastController: ToastController) {}


    async presentToast(text = 'Error', duration = 2500) {
      const toast = await this.toastController.create({
       message: text,
       duration: duration,
       position: 'top'
      });
      toast.present();
    }

    ionViewDidEnter() {
      this.splashScreen.hide();
      this.firebase.logEvent("view_tutorial", {content_type: "page_view", item_id: "view_tutorial"});
    } 

    async finish() {
      await this.storage.set('tutorialComplete', true)
              .then(res => {
                this.presentToast('Tutorial terminado');
                this.router.navigateByUrl('/');
              })
              .catch(err => {
                this.firebase.logEvent("storage_error", {content_type: "storage", item_id: "tutorial_storage_error"});
                this.presentToast('Error:'+err);
                this.router.navigateByUrl('/');
              });

    }

}
