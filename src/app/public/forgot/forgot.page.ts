//env
import { environment, SERVER_URL} from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from './../../services/authentication.service';
import { ConfirmPage } from '../confirm/confirm.page';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage {
  registerCredentials = { email: '' };
  title;
  message;
  buttonIcon;
  disabled = false;

  constructor( private authService: AuthenticationService,
               private modalController: ModalController,
               private navCtrl: NavController,
               private http: HttpClient
              ) { }

  async openModalForgot(title,message){
   const modal = await this.modalController.create({
     component: ConfirmPage,
     componentProps: {
       title: title,
       message: message,
       buttonIcon: 'checkmark-circle'
     },
     cssClass: 'modal-confirm'
   });
   this.title = modal.componentProps.title;
   this.message = modal.componentProps.message;
   this.buttonIcon = modal.componentProps.buttonIcon;
   return await modal.present();
  }


  sendForgot(){
    this.disabled=true;

    let data=JSON.stringify({
      email: this.registerCredentials.email,
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', //updated
      })};
    // return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL+"/password/reset",data, httpOptions)
           .subscribe(
               (result: any) => {
                   console.log('success reset');
                   console.log(result);
                   this.openModalForgot('Revisa tu Correo','Te hemos enviado las instrucciones para reestablecer tu contraseña');
                   this.backToLogin();
               },
               (err) => {
                 console.log('error reset');
                 console.log(err);
                 this.openModalForgot('Error','El correo no existe o no es valido');
               }
             );

  }

  backToLogin(){
    this.navCtrl.navigateBack( '/login' )
  }

}
