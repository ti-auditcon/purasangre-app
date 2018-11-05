
import { Platform, NavController  } from '@ionic/angular';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';


let TOKEN_KEY = 'auth-token';

interface obj {
    token: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public alert: string = 'hola';

  authenticationState = new BehaviorSubject(false);

  constructor(private navCtrl:NavController, private storage: Storage, private plt: Platform, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }

  //login method
  login(registerCredentials) {

    let data=JSON.stringify({
      username: registerCredentials.email,
      password: registerCredentials.password,
      grant_type: 'password',
      client_id: 2,
      client_secret: 'JqqNsmXRAQRqW3uxgIiiDHz5gwqJWxdxqP8PqMUJ',
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', //updated

      })};

    this.http.post("http://purasangreapi.asomic.com/oauth/token",data, httpOptions)
    .subscribe(
        (result: any) => {
              console.log('success 200');
              return this.storage.set(TOKEN_KEY, result.access_token).then(() => {
                this.authenticationState.next(true);
            });
        },
        err => {
          console.log('error 401');
          return this.storage.set('alert', 'error de auntentificacion').then(() => {
          //
        });
        }
      );

  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
