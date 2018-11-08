//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  constructor( public viewCtrl: ModalController,
               private navCtrl: NavController,
               private storage: Storage,
               private http: HttpClient, ) { }

  ngOnInit() {
  }

  reserve(id: string ) {
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};
        console.log(id);
      this.http.post(SERVER_URL+"/clases/"+id+"/reserve",null, httpOptions)
          .subscribe((result: any) => {
            console.log('voy a reservar...');
            this.viewCtrl.dismiss();
            this.navCtrl.navigateForward( '/home/(reservas:reservas)' );

          },
          err => {

            console.log('error 401');
            console.log(err);
            this.viewCtrl.dismiss();

          });


      });

  }

}
