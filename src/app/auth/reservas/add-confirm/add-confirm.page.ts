//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, ViewChild} from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { ConfirmPage } from '../confirm/confirm.page';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from  '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-add-confirm',
  templateUrl: './add-confirm.page.html',
  styleUrls: ['./add-confirm.page.scss'],
})
export class AddConfirmPage  {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public clase: any = [];
  public users: any = [];
  public reservations: any = [];
  public page = 1;

  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";
  title;
  message;
  buttonIcon;
  buttonAction;
  httpOptions;
  reservationUrl;

  constructor( public plt: Platform,
               private modalController: ModalController,
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

  }

  async openModal(){
    const modal = await this.modalController.create({
      component: ConfirmPage,
      componentProps: {
        title: 'Reservar esta hora',
        message: this.clase.dateHuman+' de '+this.clase.start+' a '+this.clase.end+'hrs',
        buttonIcon: '/assets/icon/info.svg',
        claseId: this.clase.clase_id,
        buttonActionAdd: true,
      },
      cssClass: 'modal-confirm'
    });
    // this.title = modal.componentProps.title;
    // this.message = modal.componentProps.message;
    // this.buttonIcon = modal.componentProps.buttonIcon;
    return await modal.present();
  }


  ionViewDidEnter() {
    this.page = 1;
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.storage.get(TOKEN_KEY).then((value) => {


      let Bearer = value;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/clases/"+id, this.httpOptions )
          .subscribe((result: any) => {
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

}
