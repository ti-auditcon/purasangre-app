//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.page.html',
  styleUrls: ['./add-day.page.scss'],
})
export class AddDayPage implements OnInit {
  public week: any = [];

  constructor( private navCtrl: NavController,
               private storage: Storage,
               private http: HttpClient,
   ) { }

  ngOnInit() {
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/week", httpOptions)
          .subscribe((result: any) => {
            console.log('entre a las weeks');
            this.week = result.data;
            console.log(this.week);
           });

    });

  }

  goToAddHour(private date: string = "2015-01-01") {
    this.navCtrl.navigateForward('/home/(reservas:add-hour/'+date+')');
  }

}
