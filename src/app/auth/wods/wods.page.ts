//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from  '@angular/router';



@Component({
  selector: 'app-wods',
  templateUrl: './wods.page.html',
  styleUrls: ['./wods.page.scss'],
})
export class WodsPage implements OnInit {

  wod:any = '';
  stages:any = '';

  constructor( 
    public activatedRoute: ActivatedRoute,   
    private storage: Storage,
    private http: HttpClient
  ) {}

  ngOnInit() {
  }
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
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.storage.get('auth-token').then((value) => {
      //console.log(value);
      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};


        this.http.get(SERVER_URL+"/wods/"+id, httpOptions)
        .subscribe((result: any) => {
          this.wod = result.data;
          console.log('wod');
          console.log(this.wod);
        });
        this.http.get(SERVER_URL+"/wods/"+id+"/stages", httpOptions)
        .subscribe((result: any) => {
          this.stages = result.data;
          console.log('stages');
          console.log(this.stages);
        });

    });
  }
  

}
