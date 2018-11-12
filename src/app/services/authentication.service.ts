//env
import { environment, SERVER_URL, API_KEY} from '../../environments/environment';
//imports
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
  public authError: any = 'e' ;

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
      client_secret: API_KEY,
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', //updated

      })};
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL+"/oauth/token",data, httpOptions)
           .subscribe(
               (result: any) => {
                     console.log('success 200');

                       this.storage.set(TOKEN_KEY, result.access_token).then(() => {
                       this.authenticationState.next(true);
                   });
                   resolve(result);
               },
               (err) => {
                 console.log('error 401');
                 reject(err);
               }
             );
    });


  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  lastError() {
    return this.authError;
  }

}
