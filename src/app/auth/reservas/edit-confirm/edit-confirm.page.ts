//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { ConfirmPage } from '../confirm/confirm.page';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from  '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ImageModalPage } from '../../shared/image-modal/image-modal.page';
// import { ElementRef, ViewChild } from '@angular/core';
let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-edit-confirm',
  templateUrl: './edit-confirm.page.html',
  styleUrls: ['./edit-confirm.page.scss'],
})
export class EditConfirmPage  {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public clase: any = [];
  public auth_reservation: any = [];
  public reservations: any = [];
  public users: any = [];
  public page = 1;

  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";
  value;
  title;
  message;
  buttonIcon;
  httpOptions;
  reservationUrl;

  constructor( public plt: Platform,
               private modalController: ModalController,
               private router: Router,
               private storage: Storage,
               private http: HttpClient,
               public activatedRoute: ActivatedRoute,
              ) {
  }

  ionViewDidEnter() {
        this.page = 1;
        if (this.plt.is('ios')) {
          //Si es iOS
          this.buttonFixIOS = "button-fix-ios"
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
          this.httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer '+ Bearer//updated
            })};

          this.http.get(SERVER_URL+"/clases/"+id, this.httpOptions)
              .subscribe((result: any) => {
                console.log(' http entre a la clase para editar');
                this.clase = result.data;
                console.log(this.clase);
                this.reservationUrl = this.clase.rels.reservations.href;
                this.loadUsers();
                 });


          });
  }

  //primeros 10 usuarios
    loadUsers(){
      console.log('cargando usuarios');
      this.http.get(this.reservationUrl+"?page="+this.page, this.httpOptions)
          .subscribe((result: any) => {
            this.reservations = result.data;
            console.log(this.reservations);
            this.page++;
           });
    }

  //cargando usuarios por infinit loader
    loadMoreUsers(infiniteScrollEvent){
      this.http.get(this.reservationUrl+"?page="+this.page, this.httpOptions)
          .subscribe((result: any) => {
            console.log('mas users agregados');
            this.reservations = this.reservations.concat(result.data);
            console.log(this.reservations);
            this.page++;
            infiniteScrollEvent.target.complete();
           });
      //this.days = this.days.concat(response.data.data);
    //  event.target.complete();
    }

  async openModal(){
    const modal = await this.modalController.create({
      component: ConfirmPage,
      componentProps: {
        custom_id: 1,
        title: 'Confirmar esta clase',
        message: this.clase.dateHuman+' de '+this.clase.start+' a '+this.clase.end+'hrs. No podras cancelar esta accion ',
        buttonIcon: '/assets/icon/info.svg',
        claseId: this.clase.clase_id,
        buttonActionConfirm: true,
      },
      cssClass: 'modal-confirm'
    });
    // this.title = modal.componentProps.title;
    // this.message = modal.componentProps.message;
    // this.buttonIcon = modal.componentProps.buttonIcon;
    return await modal.present();
  }

  async openModalCeder(){
    const modal = await this.modalController.create({
      component: ConfirmPage,
      componentProps: {
        custom_id: 0,
        title: 'Ceder tu Cupo',
        message: 'Si cedes tu cupo podrás reservar en otro horario',
        buttonIcon: '/assets/icon/info.svg',
        claseId: this.clase.clase_id,
        buttonActionRemove: true,
      },
      cssClass: 'modal-confirm'
    });
    // this.title = modal.componentProps.title;
    // this.message = modal.componentProps.message;
    // this.buttonIcon = modal.componentProps.buttonIcon;
    return await modal.present();
  }

  goToEditHour(date:string = "2015-01-01") {
    this.router.navigate( ['/home/edit-hour/'+date+''] );
  }
  //image popup
  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }


}
