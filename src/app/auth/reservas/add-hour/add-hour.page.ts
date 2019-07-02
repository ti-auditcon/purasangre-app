//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from  '@angular/router';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-add-hour',
  templateUrl: './add-hour.page.html',
  styleUrls: ['./add-hour.page.scss'],
})
export class AddHourPage {
  public clases: any = [];

  constructor( private storage: Storage,
               private http: HttpClient,
               private router: Router,
               public activatedRoute: ActivatedRoute,
               public loadingController: LoadingController
   ) { }

   async hoursLoader()
   {
      const loading = await this.loadingController.create({
       message: 'Cargando clases...',
      });
      loading.present().then(() => {
        let date = this.activatedRoute.snapshot.paramMap.get('date');
        let clasetype = this.activatedRoute.snapshot.paramMap.get('clasetype');
        this.storage.get(TOKEN_KEY).then((value) => {

          let Bearer = value;
          const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer '+ Bearer//updated
            })};

          this.http.get(SERVER_URL+"/clases?date="+date+"&type="+clasetype, httpOptions)
              .subscribe((result: any) => {
                console.log('entre a las clases del dia');
                this.clases = result.data;
                console.log(this.clases);
                loading.dismiss();
               });

        });
      });
   }

  ionViewDidEnter() {
    this.hoursLoader();
  }

  goToAddConfirm(id: string = "0", has = false) {

      this.router.navigate(['/home/add-confirm/'+id+')']);

  }

}
