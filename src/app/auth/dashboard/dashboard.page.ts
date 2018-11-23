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
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})

export class DashboardPage  {
  public user: any = '';
  //public user_plan: any = '';
  public wod: any = '';
  public today: any = []
  public alerts: any = [];


  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private http: HttpClient,
    private authService: AuthenticationService,
  ) { }

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
      //console.log(value);
      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/profile", httpOptions)
          .subscribe((result: any) => {
            this.user = result.data;
            console.log('entre');
            console.log(this.user);
            },
            err =>{
              console.log('error perfil');
              this.authService.logout();
            }
          );

        this.http.get(SERVER_URL+"/today", httpOptions)
            .subscribe((result: any) => {
              this.today = result.data;
              console.log('ENTRE today');
              console.log(this.today);
              },
               err =>{
                 console.log('error wod');
               }
             );

        this.http.get(SERVER_URL+"/users-alerts", httpOptions)
            .subscribe((result: any) => {
              this.alerts = result.data;

              console.log(this.alerts);
              },
               err =>{
                 console.log('error user-alerts');
               }
             );

    });
  }

  go() {
    this.router.navigate(['/perfil']);
  }

  verWOD() {
    // this.router.navigate(['/clases/clase']);
    this.navCtrl.navigateForward( '/home/(clases:hoy)' );
    // this.router.navigate(['/home/(clases:clase)']);
  }

  goToEditConfirm(id: string = "0") {
  //  this.navCtrl.navigateForward( '/home/(clases:clase/'+id+')');
    this.navCtrl.navigateForward( '/home/(reservas:edit-confirm/'+id+')' );
  }

}
