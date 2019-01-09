//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-hoydashboard',
  templateUrl: './hoydashboard.page.html',
  styleUrls: ['./hoydashboard.page.scss'],
})
export class HoyDashboardPage {

  public today: any = '';

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) {
    console.log('hola')
  }

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


        this.http.get(SERVER_URL+"/today", httpOptions)
        .subscribe((result: any) => {
          this.today = result.data;
          console.log('today');
          console.log(result);
        });

    });
  }


}
