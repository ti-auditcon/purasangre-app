//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController  } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage {

  buttonIcon: any;
  title: any;
  message: any;
  buttonActionAdd: any;
  buttonActionRemove: any;
  buttonActionConfirm: any;

  constructor( public viewCtrl: ModalController,
               private navCtrl: NavController,
               private storage: Storage,
               private http: HttpClient,
               private router: Router,
               public toastController: ToastController

              ) { }

  async presentToast(message: string) {
     const toast = await this.toastController.create({
       message: message,
       duration: 2500
     });
     toast.present();
   }


  reserve(id: string ) {
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};
        console.log(id);
      this.http.post(SERVER_URL+"/clases/"+id+"/reserve",null, httpOptions)
          .subscribe((result: any) => {
            console.log('voy a reservar...');
            this.viewCtrl.dismiss();
            this.navCtrl.navigateRoot( '/home/(reservas:reservas)');
            this.presentToast('Clase Reservada');


          },
          err => {

            console.log('error 401');
            console.log(err);
            this.viewCtrl.dismiss();

          });


      });

  }

  remove(id: string ) {
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};
        console.log(id);
      this.http.post(SERVER_URL+"/clases/"+id+"/remove",null, httpOptions)
          .subscribe((result: any) => {
            // console.log('voy a remover...');
            this.viewCtrl.dismiss();
            this.navCtrl.navigateRoot( '/home/(reservas:reservas)');
            this.presentToast('Has cedido tu cupo, ahora puedes reservar otra hora');
          },
          err => {
            // console.log('error 401');
            console.log(err);
            this.viewCtrl.dismiss();
          });

      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  confirm(id: string ) {
    console.log('click confirm');
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};
        console.log(id);
      this.http.post(SERVER_URL+"/clases/"+id+"/confirm",null, httpOptions)
          .subscribe((result: any) => {
            // console.log('voy a confirnar clase...');
            this.viewCtrl.dismiss();
            this.navCtrl.navigateRoot( '/home/(reservas:reservas)');
            this.presentToast('Reserva Confirmada');
          },
          err => {
            console.log('error 401');
            console.log(err);
            this.viewCtrl.dismiss();
          });

      });
  }

}
