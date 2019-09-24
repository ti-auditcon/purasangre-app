//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

let TOKEN_KEY = 'auth-token';


@Component({
  selector: 'app-pagos',
  templateUrl: 'plans.page.html',
  styleUrls: ['plans.page.scss']
})
export class PlansPage {

  public plans: any = '';

  constructor(
    private storage: Storage,
    private router: Router,
    private http: HttpClient
  ) { }

  customAlertOptions: any = {
    header: 'Clases'
  };

  classes: any[] = [
    {
      name: 'CrossFit'
    },
    {
      name: 'Frenetik'
    }
  ];

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

  goToDetail(){
    this.router.navigate(['/home/plan-detail']);
  }

  goToHistorial(){
    this.router.navigate(['/home/pay-historial']);
  }


}
