//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit , ViewChild } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from  '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';
import { ImageModalPage } from '../../shared/image-modal/image-modal.page';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public clase: any = [];
  public reservation: any = [];
  public wod: any = [];
  public textModel: string = 'no';
  public reservations: any = [];
  public page = 1;

  httpOptions;
  reservationUrl;

  constructor(
    public activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private storage: Storage,
    private http: HttpClient,
    public toastController: ToastController
  ) {
  }

  // Refresh
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewDidEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async presentToast() {
     const toast = await this.toastController.create({
       message: 'Nota Guardada',
       duration: 2000,
       position: 'top'
     });
     toast.present();
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

       this.http.get(SERVER_URL+"/clases/"+id,  this.httpOptions)
           .subscribe((result: any) => {
             console.log('entre la clase');
             this.clase = result.data;
             console.log(this.clase);
             this.reservation = this.clase.rels.auth_reservation;
             console.log(this.reservation);
             this.textModel = this.reservation.details;
             this.http.get(this.clase.rels.wod.href,  this.httpOptions)
                 .subscribe((result: any) => {
                   console.log('tiene wod');
                   this.wod = result.data;
                   console.log(this.wod);
                   this.reservationUrl = this.clase.rels.reservations.href;
                   this.loadUsers();
                  });

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


  saveDetails(){
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      // console.log(this.textModel);
      let data=JSON.stringify({
        details: this.textModel
      });
      // console.log(data);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', //updated
          'Authorization': 'Bearer '+ Bearer
        })
      };

      let id = this.reservation.reservation_id;
      console.log('reservation_id:'+id);
      this.http.post(SERVER_URL+"/reservations/"+id+"/details", data, httpOptions)
      .subscribe(
         (result: any) => {
           console.log('Resultado: '+result);
           this.presentToast();
         },
         (err) => {
           console.log('error 401:'+JSON.stringify(err));
         },
       );
     });
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
