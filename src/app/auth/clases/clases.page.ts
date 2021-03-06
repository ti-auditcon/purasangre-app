//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  public todayWods: any = [];
  public page = 1;

  httpOptions;


  constructor(

    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  // Refresh
  doRefresh(event) {
    console.log('Begin async operation');
    this.page = 1;
    this.ionViewDidEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.page = 1;
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;

      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/clases-historic?sort_by_desc=date&page="+this.page, this.httpOptions)
          .subscribe((result: any) => {
            console.log('entre al historico');
            this.clases = result.data.filter(clase => clase.rels.auth_reservation.status == 'Consumida');
            console.log(this.clases);
            this.page++;
          },
          err => {
            console.log('error clases');
            this.authService.refreshToken();
          });
      this.http.get(SERVER_URL+"/todaywods", this.httpOptions)
           .subscribe((result: any) => {
             this.todayWods = result.data;
             console.log('today');
             console.log(result.data);
           });

    });
  }
  goTo(wod:any){
    let reservation = wod.rels.auth.todayReservation;
    console.log('entre goto');
    console.log(reservation);

    if(wod.rels.auth.reservationHas){
      console.log('tengo clase');
      if((reservation.status == 1) || (reservation.status == 2) ){
        this.router.navigate( ['/home/edit-confirm/'+reservation.id+''] );
      }
      if((reservation.status == 3) ){
        this.router.navigate( ['/home/clase/'+reservation.id+''] );
      }
      if(reservation.status == 4){
        this.router.navigate( ['/home/wods/'+wod.identificador+''] );
      }
      
      
    } else {
      console.log('no tengo clase');
      this.router.navigate( ['/home/wods/'+wod.identificador+''] );
    }
  }

  goClase(id: string = "0"){
   this.router.navigate(['/home/clase/'+id+'']);
  }
  
  // goTodayClase(status: any = 0, wod:any, clase:any){
  //   if((status == 1) || (status == 2) ){
  //     this.router.navigate( ['/home/edit-confirm/'+clase+''] );
  //   }
  //   if((status == 3) ){
  //     this.router.navigate( ['/home/clase/'+clase+''] );
  //   }
    
  //   this.router.navigate( ['/home/wods/'+wod+''] );
    
  // }
  // goTodayWod(wod: string = "0"){
  //   this.router.navigate( ['/home/wods/'+wod+''] );
  //   // console.log('hola');
  //   // let status = this.today.auth_reservation.reservation.status;
  //   // if(has){
  //   //   if((status == 1) || (status == 2) ){
  //   //     this.router.navigate( ['/home/edit-confirm/'+this.today.auth_reservation.reservation.id+''] );
  //   //   //  this.router.navigate( ['/home/edit-confirm/'+this.today.auth_reservation.reservation.id+''] );
  //   //   }
  //   //   if((status == 3) ){
  //   //     this.router.navigate( ['/home/clase/'+this.today.auth_reservation.reservation.id+''] );
  //   //   }
  //   //   if((status == 4)){
  //   //     this.router.navigate( ['/home/hoy/'] );
  //   //   }
  //   // } else {
  //   //   this.router.navigate( ['/home/hoy/'] );
  //   // }

  // }

  loadMoreClases(infiniteScrollEvent){
    this.http.get(SERVER_URL+"/clases-historic?sort_by_desc=date&page="+this.page, this.httpOptions)
        .subscribe((result: any) => {
          console.log('mas clases');
          console.log('page:'+this.page);
          this.clases = this.clases.concat(result.data.filter(clase => clase.rels.auth_reservation.status == 'Consumida'));
          this.page++;
          infiniteScrollEvent.target.complete();
        },
        err => {
          console.log('error clases');
        });
  }

}
