//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from  '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';


@Component({
  selector: 'app-clase',
  templateUrl: './clase.page.html',
  styleUrls: ['./clase.page.scss'],
})
export class ClasePage implements OnInit {

  public clase: any = [];
  public reservation: any = [];
  public wod: any = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    private storage: Storage,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    //console.log('entre amigos mios a la clase id:');
     //console.log(this.activatedRoute.snapshot);
     let id = this.activatedRoute.snapshot.paramMap.get('id');
     this.storage.get(TOKEN_KEY).then((value) => {

       let Bearer = value;

       const httpOptions = {
         headers: new HttpHeaders({
           'Authorization': 'Bearer '+ Bearer//updated
         })};

       this.http.get(SERVER_URL+"/clases/"+id, httpOptions)
           .subscribe((result: any) => {
             console.log('entre la clase');
             this.clase = result.data;
             console.log(this.clase);
             this.reservation = this.clase.rels.auth_reservation;

             this.http.get(this.clase.rels.wod.href, httpOptions)
                 .subscribe((result: any) => {
                   console.log('tiene wod');
                   this.wod = result.data;
                   console.log(this.wod);
                  });
              });
     });
  }

  // input = document.getElementById('inputEdit');

  focusInput(){
    document.getElementById('inputEdit').focus();
  }

  editDetails(){

  }

}
