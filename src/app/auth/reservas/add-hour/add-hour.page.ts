//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from  '@angular/router';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-add-hour',
  templateUrl: './add-hour.page.html',
  styleUrls: ['./add-hour.page.scss'],
})
export class AddHourPage implements OnInit {
  public clases: any = [];

  constructor( private navCtrl: NavController,
               private storage: Storage,
               private http: HttpClient,
               public activatedRoute: ActivatedRoute,
   ) { }

  ngOnInit() {
    let date = this.activatedRoute.snapshot.paramMap.get('date');
    this.storage.get(TOKEN_KEY).then((value) => {

      let Bearer = value;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/clases?date="+date, httpOptions)
          .subscribe((result: any) => {
            console.log('entre a las clases del dia');
            this.clases = result.data;
            console.log(this.clases);
           });

    });
  }

  goToAddConfirm(id: string = "0", has = false) {
    if(has){
        this.navCtrl.navigateForward( '/home/(reservas:add-confirm/'+id+')' );
    }
  }

}
