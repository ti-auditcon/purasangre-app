//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component} from '@angular/core';
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
export class EditConfirmPage  {
  public clase: any = [];
  public auth_reservation: any = [];
  public reservations: any = [];
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



  }

  ionViewDidEnter() {

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
                this.auth_reservation = this.clase.rels.auth_reservation;
                this.http.get(this.clase.rels.reservations.href, httpOptions)
                    .subscribe((result: any) => {
                      console.log('tiene users');
                      this.reservations = result.data;
                      console.log(this.reservations);
                     });
                 });


          });
  }

  async openModal(){
    const modal = await this.modalController.create({
      component: ConfirmPage,
      componentProps: {
        custom_id: 1,
        title: 'Confirmar esta clase',
        message: this.clase.dateHuman+' de '+this.clase.start+' a '+this.clase.end+'hrs. No podras cancelar esta accion ',
        buttonIcon: 'information-circle',
        claseId: this.clase.clase_id,
        buttonActionConfirm: true,
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
        buttonIcon: 'information-circle',
        claseId: this.clase.clase_id,
        buttonActionRemove: true,
      },
      cssClass: 'modal-confirm'
    });
    this.title = modal.componentProps.title;
    this.message = modal.componentProps.message;
    this.buttonIcon = modal.componentProps.buttonIcon;
    return await modal.present();
  }

  goToEditHour(date:string = "2015-01-01") {
    this.navCtrl.navigateForward( '/home/(reservas:edit-hour/'+date+')' );
  }



}
