
import { environment, SERVER_URL} from '../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  public plans: any = '';

  constructor(
    private storage: Storage,
    private http: HttpClient
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

        this.http.get(SERVER_URL+"/plans", httpOptions)
        .subscribe((result: any) => {
          this.plans = result.data.filter(plan => plan.rels.bill.has == true);
          console.log('entre plans');
          console.log(this.plans);

        });

    });
  }

  ngOnInit() {
  }

}
