//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { ElementRef, ViewChild } from '@angular/core';
let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-reservas',
  templateUrl: 'reservas.page.html',
  styleUrls: ['reservas.page.scss']
})
export class ReservasPage {
  public clases: any = [];
  public today_clase: any = [];
  public alerts: any = [];
  public pendient: any = [];
  public confirmed: any = [];


  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";


  constructor(
    private navCtrl: NavController,
    public plt: Platform,
    private storage: Storage,
    private http: HttpClient,

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

  ionViewDidEnter() {
    console.log('estoy cargandome........');
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
  //  this.navCtrl.navigateForward( '/home/(clases:clase/'+id+')');
    this.navCtrl.navigateForward( '/home/(reservas:edit-confirm/'+id+')' );
  }
  goToAddDay() {
    this.navCtrl.navigateForward( '/home/(reservas:add-day)' );
  }

  enter() {
    console.log('entreeeeeeeee!!!!!!!!!!!!!!!');
  }

}
