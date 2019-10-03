//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router , ActivatedRoute } from '@angular/router';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';



let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-pago-detail',
  templateUrl: './plan-detail.page.html',
  styleUrls: ['./plan-detail.page.scss'],
})
export class PlanDetailPage implements OnInit {
  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";
  plan: any ;
  dates: any ;

  constructor(
    public activatedRoute: ActivatedRoute,
    private plt: Platform,
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
    // public  iap: InAppBrowser
    ) {
    if (this.plt.is('ios')) {
      //Si es iOS
      this.buttonFixIOS = "button-fix-ios";
      this.buttonFixAndroid = "display-none";
    } else {
      //Si es Android
      this.buttonFixIOS = "display-none";
      this.buttonFixAndroid = "button-fix";
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.storage.get(TOKEN_KEY).then((value) => {
      //console.log(value);
      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        this.http.get(SERVER_URL+"plans/"+id, httpOptions)
        .subscribe((result: any) => {
          console.log(result.data);
          this.plan = result.data;

        });

        this.http.get(SERVER_URL+"plans/"+id+"/dates", httpOptions)
        .subscribe((result: any) => {
          console.log(result);
          this.dates = result;

        });

    });
  }

  contract(id:any) {
    this.router.navigate(['/home/plan-flow/'+id+'']);
  }

}
