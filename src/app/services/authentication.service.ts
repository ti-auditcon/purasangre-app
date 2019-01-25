//env
import { environment, SERVER_URL, API_KEY} from '../../environments/environment';
//imports
import { Platform  } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';



let TOKEN_KEY = 'auth-token';
let REFRESH_TOKEN = 'refresh-token';

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

  constructor(private router: Router,
              private storage: Storage,
              private plt: Platform,
              private http: HttpClient) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        // console.log('res:'+res);
        this.authenticationState.next(true);
      } else
      {
        // console.log('res:'+res);
        this.authenticationState.next(false);
      }
    })
  }

  refreshToken() {
    this.storage.get(REFRESH_TOKEN).then(res => {
      let refresh_token = res;
      let data=JSON.stringify({
        grant_type: 'refresh_token',
        client_id: 2,
        client_secret: API_KEY,
        refresh_token: refresh_token,
      });
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json', //updated
        })};
      // return new Promise((resolve, reject) => {
        this.http.post(SERVER_URL+"/oauth/token",data, httpOptions)
             .subscribe(
                 (result: any) => {
                     console.log('success refresh 200');
                       this.storage.set(REFRESH_TOKEN, result.refresh_token);
                       this.storage.set(TOKEN_KEY, result.access_token).then(() => {
                         this.authenticationState.next(true);
                         this.router.navigate(['/home/']);
                       });
                 },
                 (err) => {
                   console.log('error refrersh 401:'+JSON.stringify(err));
                   this.logout();
                 }
               );
      // });
    })
    .catch(function (error) {
        console.log(error);
    });


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
                 this.storage.set(REFRESH_TOKEN, result.refresh_token);
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
    this.storage.remove(REFRESH_TOKEN);
    this.storage.remove('tutorialComplete');
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
