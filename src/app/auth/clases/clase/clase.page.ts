//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from  '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';


@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {

  public clase: any = [];
  public reservation: any = [];
  public wod: any = [];
  public textModel: string = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    private storage: Storage,
    private http: HttpClient,
    public toastController: ToastController
  ) {
  }

  async presentToast() {
     const toast = await this.toastController.create({
       message: 'Nota Guardada',
       duration: 2500
     });
     toast.present();
   }

  ngOnInit() {
    //console.log('entre amigos mios a la clase id:');
     //console.log(this.activatedRoute.snapshot);
     let id = this.activatedRoute.snapshot.paramMap.get('id');
     this.storage.get(TOKEN_KEY).then((value) => {

       let Bearer = value;

       const httpOptions = {
         headers: new HttpHeaders({
           'Authorization': 'Bearer '+ Bearer//updated
         })};

       this.http.get(SERVER_URL+"/clases/"+id, httpOptions)
           .subscribe((result: any) => {
             console.log('entre la clase');
             this.clase = result.data;
             console.log(this.clase);
             this.reservation = this.clase.rels.auth_reservation;
             console.log(this.reservation);
             this.textModel = this.reservation.details;
             this.http.get(this.clase.rels.wod.href, httpOptions)
                 .subscribe((result: any) => {
                   console.log('tiene wod');
                   this.wod = result.data;
                   console.log(this.wod);
                  });
              });
     });
  }

  // input = document.getElementById('inputEdit');

  // focusInput(){
  //   document.getElementById('inputEdit').focus();
  // }

  // editDetails(){
  //
  // }

  saveDetails(){
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      console.log(this.textModel);
      let data=JSON.stringify({
        details: this.textModel,
      });
      console.log(data);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', //updated
          'Authorization': 'Bearer '+ Bearer//updated

        })};
      let id =  this.reservation.reservation_id;
      console.log(id);
      this.http.post(SERVER_URL+"/reservations/"+id+"/details",data, httpOptions)
           .subscribe(
               (result: any) => {

                     console.log(result);
                     this.presentToast();

               },
               (err) => {
                 console.log('error 401');
               },
             );
           });
         }

}
