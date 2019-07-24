//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
import { ChartsModule } from 'ng2-charts';
import { Firebase } from '@ionic-native/firebase/ngx';
import * as chart from 'chart.js';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})

export class DashboardPage  {

   @ViewChild('barCanvas') barCanvas;

   barChart: any;

  public user: any = '';
  //public user_plan: any = '';
  public wod: any = '';
  public wods: any = '';
  public today: any = [];
  public alerts: any = [];
  public assistance: any = [];
  public avatar: any = '';

  public active: boolean = false;


  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private firebase: Firebase,
    private splashScreen: SplashScreen,
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

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };


  ionViewWillEnter() {


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
            //this.storage.set('avatar', this.user.avatar);
            var random = (new Date()).toString();
            this.avatar = this.user.avatar+"?cb=" + random;
            console.log(this.user);
            this.splashScreen.hide();
            if(!this.user.tutorial){
              this.router.navigateByUrl('/tutorial');
            }

            },
            err =>{
              console.log('error perfil');
              this.authService.refreshToken();
              this.splashScreen.hide();

            }
          );

        // this.http.get(SERVER_URL+"/today", httpOptions)
        //     .subscribe((result: any) => {
        //       this.today = result.data;
        //       console.log('ENTRE today');
        //       console.log(this.today);
        //       },
        //        err =>{
        //          console.log('error wod');
        //        }
        //      );

        this.http.get(SERVER_URL+"/todaywods", httpOptions)
             .subscribe((result: any) => {
               this.wods = result.data;
               console.log('ENTRE wods');
               console.log(this.wods);
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
                 // this.firebase.logEvent("user_alerts_error", {content_type: "http_error", item_id: "dashboard"});
                 console.log('error user-alerts');
               }
             );

         this.http.get(SERVER_URL+"/assistance", httpOptions)
             .subscribe((result: any) => {
               this.assistance = result;

               console.log(this.assistance);
               this.barChart = new chart(this.barCanvas.nativeElement, {

                   type: 'bar',
                   data: {
                       labels: this.assistance.label,

                       datasets: [{
                           data: this.assistance.data,
                           label:'',
                           backgroundColor:  'rgba(255, 99, 132, 0.2)',
                           borderWidth: 1
                       }]
                   },
                   options: {
                     legend: {
                       display: false,
                     },
                     scales: {
                       yAxes: [{
                        type: "linear",
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                        gridLines: {
                          display: false
                        },
                        labels: {
                          show: true,

                        },
                        ticks: {
                          suggestedMax: 24,
                          beginAtZero: true,
                          userCallback: function(label, index, labels) {
                            if (Math.floor(label) === label) {
                              return label;
                            }

                          },
                        }

                      }]
                     },
                   },


               });
               },
                err =>{
                  console.log('error assistance');
                }
              );

    });
  }
  ionViewDidEnter() {

  }

  verWOD(id:any) {
    this.firebase.logEvent("go_to_wod", {content_type: "action", item_id: "dashboard_button"});
    this.router.navigate( ['/home/wods/'+id+''] );
  }

  goToEditConfirm(id: string = "0") {
    this.firebase.logEvent("go_to_profile", {content_type: "action", item_id: "dashboard_profile_button"});
    this.router.navigate( ['/home/edit-confirm/'+id+''] );
  }

}
