//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { ConfirmPage } from '../confirm/confirm.page';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from  '@angular/router';
// import { ElementRef, ViewChild } from '@angular/core';
let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-edit-confirm',
  templateUrl: './edit-confirm.page.html',
  styleUrls: ['./edit-confirm.page.scss'],
})
export class EditConfirmPage implements OnInit {
  public clase: any = [];
  public reservation: any = [];
  public users: any = [];

  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";
  value;
  title;
  message;
  buttonIcon;

  constructor( public plt: Platform,
               private modalController: ModalController,
               private navCtrl: NavController,
               private storage: Storage,
               private http: HttpClient,
               public activatedRoute: ActivatedRoute,
              ) {

    if (this.plt.is('ios')) {
      //Si es iOS
      this.buttonFixIOS = "button-fix-ios";
      this.buttonFixAndroid = "display-none";
    } else {
      //Si es Android
      this.buttonFixIOS = "display-none";
      this.buttonFixAndroid = "button-fix";
    }
    console.log('hola entre a la clase para editar');
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('sii');
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/clases/"+id, httpOptions)
          .subscribe((result: any) => {
            console.log(' http entre a la clase para editar');
            this.clase = result.data;
            console.log(this.clase);
            this.reservation = this.clase.rels.auth_reservation;
            this.http.get(this.clase.rels.users.href, httpOptions)
                .subscribe((result: any) => {
                  console.log('tiene users');
                  this.users = result.data;
                  console.log(this.users);
                 });
             });


      });


  }

  ngOnInit() {

  }

  async openModal(){
    const modal = await this.modalController.create({
      component: ConfirmPage,
      componentProps: {
        custom_id: 1,
        title: 'Reservar esta hora',
        message: 'Viernes 13 de 19:00 a 20:00 hrs',
        buttonIcon: 'information-circle'
      },
      cssClass: 'modal-confirm'
    });
    this.title = modal.componentProps.title;
    this.message = modal.componentProps.message;
    this.buttonIcon = modal.componentProps.buttonIcon;
    return await modal.present();
  }

  async openModalCeder(){
    const modal = await this.modalController.create({
      component: ConfirmPage,
      componentProps: {
        custom_id: 0,
        title: 'Ceder tu Cupo',
        message: 'Si cedes tu cupo podrás reservar en otro horario',
        buttonIcon: 'information-circle'
      },
      cssClass: 'modal-confirm'
    });
    this.title = modal.componentProps.title;
    this.message = modal.componentProps.message;
    this.buttonIcon = modal.componentProps.buttonIcon;
    return await modal.present();
  }

  goToEditHour() {
    this.navCtrl.navigateForward( '/home/(reservas:edit-hour)' );
  }

  ngOnInit() {
  }

}
