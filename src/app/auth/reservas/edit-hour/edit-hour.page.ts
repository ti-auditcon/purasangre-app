//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from  '@angular/router';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-edit-hour',
  templateUrl: './edit-hour.page.html',
  styleUrls: ['./edit-hour.page.scss'],
})
export class EditHourPage implements OnInit {
  public clases: any = [];

  constructor( private router: Router,
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

  goToEditConfirm(id:string = "0", has = false) {
    if(!has){
        this.router.navigate( ['/home/edit-confirm/'+id+')'] );
    }

  }

}
