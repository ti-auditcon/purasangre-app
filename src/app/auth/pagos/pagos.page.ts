//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';


@Component({
  selector: 'app-pagos',
  templateUrl: 'pagos.page.html',
  styleUrls: ['pagos.page.scss']
})
export class PagosPage {

  public plans: any = '';

  constructor(
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

        this.http.get(SERVER_URL+"/plans", httpOptions)
        .subscribe((result: any) => {
          this.plans = result.data.filter(plan => plan.rels.bill.has == true);
          console.log('entre plans');
          console.log(this.plans);

        });

    });
  }



}
