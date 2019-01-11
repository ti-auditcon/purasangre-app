//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';

let TOKEN_KEY = 'auth-token';


@Component({
  selector: 'app-clases',
  templateUrl: 'clases.page.html',
  styleUrls: ['clases.page.scss']
})
export class ClasesPage {
  public clases: any = [];
  public today: any = [];

  constructor(

    private storage: Storage,
    private http: HttpClient,
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  // Refresh
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewDidEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/clases-historic?sort_by_desc=date", httpOptions)
          .subscribe((result: any) => {
            console.log('entre al historico');
            this.clases = result.data.filter(clase => clase.rels.auth_reservation.status == 'Consumida');
            console.log(this.clases);
          },
          err => {
            console.log('error clases');
            this.authService.refreshToken();
          });
      this.http.get(SERVER_URL+"/today", httpOptions)
           .subscribe((result: any) => {
             this.today = result.data;
             console.log('today');
             console.log(result);
           });

    });
  }

  irAClase(id: string = "0"){
    // this.router.navigateByUrl( '/home/(clases:clase)' );
  //  this.storage.set('clase_id', '1');
  //  this.navCtrl.navigateForward( '/home/(clases:clase/{{1}})')
   //this.router.navigate('/home/(clases:clase/1)');

   this.navCtrl.navigateForward( '/home/(clases:clase/'+id+')');



  }

  irAClaseHoy(has = false){
    status = this.today.auth_reservation.reservation.status
    if(has){
      if((status == 1) || (status == 2) ){
        this.navCtrl.navigateForward( '/home/(reservas:edit-confirm/'+this.today.auth_reservation.reservation.id+')');
      }
      if((status == 3) ){
        this.navCtrl.navigateForward( '/home/(clases:clase/'+this.today.auth_reservation.reservation.id+')');
      }
      if((status == 4)){
        this.navCtrl.navigateForward( '/home/(clases:hoy)/');
      }
    } else {
      this.navCtrl.navigateForward( '/home/(clases:hoy)/');
    }


  }

}
