//env
import { environment, SERVER_URL} from '../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.page.html',
  styleUrls: ['./add-class.page.scss'],
})
export class AddClassPage implements OnInit {

  public claseTypes:any;

  constructor( private storage: Storage,
    private router: Router,
    private http: HttpClient,
    public loadingController: LoadingController ) { }

  ngOnInit() {
    this.claseTypeLoader();
  }

  ionViewDidEnter() {}

  async claseTypeLoader()
  {
     const loading = await this.loadingController.create({
      message: 'Cargando clases',
     });
     loading.present().then(() => {
       this.storage.get(TOKEN_KEY).then((value) => {

         let Bearer = value;
         const httpOptions = {
           headers: new HttpHeaders({
             'Authorization': 'Bearer '+ Bearer
             //updated
           })};

           this.http.get(SERVER_URL+"/clases-types", httpOptions)
           .subscribe((result: any) => {
             this.claseTypes = result.data;
             console.log('entre a las clasetype');
             console.log(result.data);
             loading.dismiss();
            });

       });
     });
  }
  goToDay(id:any) {
    this.router.navigate(['/home/clase-type/'+id+'/add-day']);
  }

}
