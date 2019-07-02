//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
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
               public activatedRoute: ActivatedRoute,
               public loadingController: LoadingController ) { }

   async weekLoader()
   {
      const loading = await this.loadingController.create({
       message: 'Cargando semana...',
      });
      loading.present().then(() => {
        this.storage.get(TOKEN_KEY).then((value) => {
          let clasetype = this.activatedRoute.snapshot.paramMap.get('clasetype');
          let Bearer = value;
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer '+ Bearer
              //updated
            })};

          this.http.get(SERVER_URL+"/week/"+clasetype, httpOptions)
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

  goToAddHour(date: string = "2015-01-01", has:boolean = false ) {
    console.log(has);
    if(has){
      let clasetype = this.activatedRoute.snapshot.paramMap.get('clasetype');
      this.router.navigate(['/home/clase-type/'+clasetype+'/add-day/'+date]);
    }
  }

}
