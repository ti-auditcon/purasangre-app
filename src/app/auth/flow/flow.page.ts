//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit, NgZone } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { WebviewOverlay } from '@teamhive/capacitor-webview-overlay';

import { Router,ActivatedRoute  } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.page.html',
  styleUrls: ['./flow.page.scss'],
})
export class FlowPage implements OnInit  {
  public loading = true;
  public loaded = false;
  public progress: number;
  public url:string;
  public html:any;

//   @ViewChild('webview') webviewEl: ElementRef;

  constructor(
    public activatedRoute: ActivatedRoute,
    public platform: Platform,
    public menuCtrl: MenuController,
    public zone: NgZone,
    public storage: Storage,
    public http:HttpClient,
    public route: Router,
    public iap: InAppBrowser,
    public sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
  }


  ionViewDidEnter() {
    this.loaded = false;
    this.loading = true;
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.storage.get(TOKEN_KEY).then((value) => {
      //console.log(value);
      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

        this.http.get(SERVER_URL+"plans/"+id+"/contract", httpOptions)
        .subscribe((result: any) => {
          console.log(result.data);
          this.http.get(SERVER_URL+"flow/"+result.data.id, httpOptions)
          .subscribe((result: any) => {
            console.log('url flow');
            console.log(result.url);

            const target = "_self";
            const options = '{location:"no"}' ;

            
            const browser = this.iap.create(result.url, '_self', "hideurlbar=yes,toolbarcolor=#00BFC9");
            browser.on('loadstop').subscribe((event) => {
              console.log('cargo');
            });

            browser.on('exit').subscribe((event) => {
              this.route.navigate(['/home/plans']);
            });

            

          });
        });



    });

  }
  
  



}
