//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.page.html',
  styleUrls: ['./add-day.page.scss'],
})
export class AddDayPage  {
  public week: any = [];

  constructor( private storage: Storage,
               private router: Router,
               private http: HttpClient,
               public loadingController: LoadingController ) { }

   async weekLoader()
   {
      const loading = await this.loadingController.create({
       message: 'Cargando semana...',
      });
      loading.present().then(() => {
        this.storage.get(TOKEN_KEY).then((value) => {

          let Bearer = value;
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer '+ Bearer
              //updated
            })};

          this.http.get(SERVER_URL+"/week", httpOptions)
              .subscribe((result: any) => {
                console.log('entre a las weeks');
                this.week = result.data;
                console.log(this.week);
                loading.dismiss();

               });

        });
      });
   }

  ionViewDidEnter() {
    this.weekLoader();
  }

  goToAddHour(date: string = "2015-01-01", has = false ) {
    if(has){
      this.router.navigate(['/home/add-hour/'+date+'']);
    }
  }

}
