import { environment, SERVER_URL, API_KEY} from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Storage } from '@ionic/storage';
// import { AngularFirestore } from '@angular/fire/firestore';

let TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private firebase: Firebase,
              // private afs: AngularFirestore,
              private platform: Platform,
              private http: HttpClient,
              private storage: Storage,
              private authService: AuthenticationService) {}

  async getToken() {

      let token;
      if (this.platform.is('android')) {
        token = await this.firebase.getToken();
      }

      if (this.platform.is('ios')) {
        token = await this.firebase.getToken();
        await this.firebase.grantPermission();
      }

      this.saveToken(token);
  }

  private saveToken(token) {
      if (!token) return;
      this.storage.get(TOKEN_KEY).then((value) => {
        let Bearer = value;
        let data=JSON.stringify({
          token: token,
        });
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer '+ Bearer//updated
          })};io

        this.http.post(SERVER_URL+"fcm/token",data, httpOptions)
             .subscribe(
                 (result: any) => {
                     console.log('success fcm token 200:'+JSON.stringify(result));
                     return true;
                 },
                 (err) => {
                   console.log('error refrersh 401:'+JSON.stringify(err));
                   this.authService.logout();
                 }
               );
      });
      // const devicesRef = this.afs.collection('devices');
      //
      // const data = {
      //   token,
      //   userId: 'testUserId' //cambiar por id usuario
      // };
      //
      // return devicesRef.doc(token).set(data);


  }

  onNotifications() {
      return this.firebase.onNotificationOpen();
  }

}
