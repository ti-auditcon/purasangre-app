import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-hoy',
  templateUrl: './hoy.page.html',
  styleUrls: ['./hoy.page.scss'],
})
export class HoyPage implements OnInit {

  public wod: any = '';

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.storage.get(TOKEN_KEY).then((value) => {
      //console.log(value);
      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};


        this.http.get("http://purasangreapi.asomic.com/todaywods", httpOptions)
        .subscribe((result: any) => {
          this.wod = result.data[0];
          console.log('ENTRE WOD');
          console.log(this.wod);
        });

    });
  }


}
