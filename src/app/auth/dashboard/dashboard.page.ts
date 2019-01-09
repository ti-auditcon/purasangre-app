//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './../../services/authentication.service';
import { ChartsModule } from 'ng2-charts';
import * as chart from 'chart.js';



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
  public today: any = [];
  public alerts: any = [];
  public assistance: any = [];

  public active: boolean = false;


  constructor(
    private router: Router,
    private navCtrl: NavController,
    private storage: Storage,
    private http: HttpClient,
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
              this.authService.refreshToken();
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
                          suggestedMax: 25,
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
