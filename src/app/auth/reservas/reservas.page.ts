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

  ngOnInit() {
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/clases-coming?sort_by_asc=date", httpOptions)
          .subscribe((result: any) => {
            console.log('entre a las calses coming');
            this.clases = result.data;
            console.log(this.clases);
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

}
