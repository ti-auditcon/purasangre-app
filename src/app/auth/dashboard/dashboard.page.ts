import { Component, OnInit } from '@angular/core';
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
export class DashboardPage implements OnInit {
  public user: any = '';
  public user_plan: any = '';
  public wod: any = '';

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.storage.get(TOKEN_KEY).then((value) => {
      //console.log(value);
      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get("http://purasangreapi.asomic.com/profile", httpOptions)
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

        this.http.get("http://purasangreapi.asomic.com/todaywods", httpOptions)
        .subscribe((result: any) => {
          this.wod = result.data[0];
          console.log('ENTRE WOD');
          console.log(this.wod);
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

}
