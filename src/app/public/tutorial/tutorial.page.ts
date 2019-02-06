import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {

  constructor(private storage: Storage,
              private router: Router,
              public toastController: ToastController) {}


    async presentToast(text = 'Error', duration = 2500) {
      const toast = await this.toastController.create({
       message: text,
       duration: duration,
       position: 'top'
      });
      toast.present();
    }

    async finish() {
      await this.storage.set('tutorialComplete', true)
              .then(res => {
                this.presentToast('Tutorial terminado');
                this.router.navigateByUrl('/');
              })
              .catch(err => {
                this.presentToast('Error:'+err);
              });

    }

}
