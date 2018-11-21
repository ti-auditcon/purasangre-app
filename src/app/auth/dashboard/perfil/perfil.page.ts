//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Platform } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: any = '';
  public user_plan: any = '';
  public errors: any = 'sin errores';

  constructor( private storage: Storage,
               private authService: AuthenticationService,
               private http: HttpClient,
               private camera: Camera,
               private crop: Crop,
               private platform: Platform,
               private webview: WebView ) {}

  base64Image:any;
  preImage:any;

  selectImageFromCamera()
  {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
    this.preImage = imageData;

    this.crop.crop(this.preImage, {quality: 100})
    .then(
      newImage => {
        this.base64Image = this.webview.convertFileSrc(newImage);

        this.storage.get(TOKEN_KEY).then((value) => {

          let Bearer = value;
        //  console.log(this.textModel);
          let data=JSON.stringify({
            image: this.base64Image,
          });
          console.log(data);
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json', //updated
              'Authorization': 'Bearer '+ Bearer//updated

            })};

            this.http.post(SERVER_URL+"/profile/image",data, httpOptions)
                .subscribe((result: any) => {
                  console.log('me responfio profile/image');
                  console.log(result);
                  this.errors = result;
                },
                err =>{
                  console.log('error perfil');
                  this.errors = err;
                });
        });


      }, error => {
         console.error('Error cropping image', error);
        }
     );
     }, (err) => {
       console.log(err);
     });
   }

  ngOnInit() {
    this.storage.get(TOKEN_KEY).then((value) => {
      //console.log(value);
      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/profile", httpOptions)
                  .subscribe((result: any) => {
                    this.user = result.data;
                    console.log('entre');
                    console.log(this.user);
                    console.log(this.user.rels.active_plan.href);
                    this.http.get(this.user.rels.active_plan.href, httpOptions)
                                .subscribe((result: any) => {
                                  console.log('entre plan activo');
                                  this.user_plan = result.data;
                                  console.log(this.user_plan);

                                 });
                   });


    });

  }
  logout() {
    this.authService.logout();
  }

}
