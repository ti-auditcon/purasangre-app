//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';


let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage  {
  public user: any = '';
  public user_plan: any = '';
  public wod: any = '';
  public alerts: any = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private http: HttpClient
  ) { }

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
            console.log(this.user.rels.active_plan.href);
            this.http.get(this.user.rels.active_plan.href, httpOptions)
                .subscribe((result: any) => {
                  console.log('entre plan activo');
                  this.user_plan = result.data;
                  console.log(this.user_plan);

                 });
        });

        this.http.get(SERVER_URL+"/todaywods", httpOptions)
        .subscribe((result: any) => {
          this.wod = result.data[0];
          console.log('ENTRE WOD');
          console.log(this.wod);
        });

        this.http.get(SERVER_URL+"/users-alerts", httpOptions)
        .subscribe((result: any) => {
          this.alerts = result.data;

          console.log(this.alerts);
        });

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
