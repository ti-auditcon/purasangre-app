//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-reservas',
  templateUrl: 'reservas.page.html',
  styleUrls: ['reservas.page.scss'],
})

export class ReservasPage {
  public clases: any = [];
  public today_clase: any = [];
  public alerts: any = [];
  public pendient: any = [];
  public confirmed: any = [];

  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";
  confirmation: string = "";

  constructor(
    public plt: Platform,
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
    public toastController: ToastController,
    private authService: AuthenticationService,

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

    var buttonConf = document.getElementById('confirmacion');

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
       message: 'Hora Reservada',
       duration: 2500,
       position: 'top'
     });
     toast.present();
   }

  ionViewDidEnter() {
    // console.log('estoy cargandome........');
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/clases-coming?sort_by_asc=date", httpOptions)
          .subscribe((result: any) => {
            console.log('entre a las clases coming');
            this.clases = result.data;
            console.log(this.clases);
            this.pendient =  this.clases.filter(clase=> clase.rels.auth_reservation.status == 'Pendiente');
            this.confirmed =  this.clases.filter(clase=> clase.rels.auth_reservation.status == 'Confirmada');
          },
          err => {
            console.log('error clases');
            this.authService.refreshToken();
          });

           // console.log(this.today);

      this.http.get(SERVER_URL+"/users-alerts", httpOptions)
           .subscribe((result: any) => {
             this.alerts = result.data;

             console.log(this.alerts);
           });
    });


  }

  goToEditConfirm(id: string = "0") {
    this.router.navigate( ['/home/edit-confirm/'+id+')'] );
  }
  goToAddDay() {
    this.router.navigate( ['/home/add-day'] );
  }

  enter() {
    console.log('entreeeeeeeee!!!!!!!!!!!!!!!');
  }

}
