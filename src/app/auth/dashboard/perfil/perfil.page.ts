//env
import { environment, SERVER_URL, IMAGE_URL} from '../../../../environments/environment';
//imports
import { Component} from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Crop } from '@ionic-native/crop/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  public user: any = '';
  public user_plan: any = '';
  public errors: any = 'sin errores';
  public link: any = 'sin link';
  public alerts: any = [];
  public image: any = '';
  public imageClean: any = '';
  public avatar: any = '';

  imageURI:any;
  imageFileName:any;
  variable = "variable";

  constructor( private storage: Storage,
               private authService: AuthenticationService,
               private http: HttpClient,
               private camera: Camera,
               private crop: Crop,
               private platform: Platform,
               private webview: WebView,
               private transfer: FileTransfer,
               public toastController: ToastController,
               private router: Router
             ) {}

  base64Image:any;
  preImage:any;
  public fileTransfer: FileTransferObject = this.transfer.create();

  // Refresh
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewDidEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async presentToast(text = 'Error', duration = 2500) {
     const toast = await this.toastController.create({
       message: text,
       duration: duration,
       position: 'top'
     });
     toast.present();
   }

  selectImageFromCamera() {
    // this.presentToast('images!!!');
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      targetWidth: 400,
      targetHeight: 400,
    }

    this.camera.getPicture(options).then((imageData) => {
        this.crop.crop(imageData, {})
        .then(
          newImage => {
            //this.imageURI = imageData;
            let options1: FileUploadOptions = {
             fileKey: 'image',
             fileName: 'avatar.jpg',
             headers: {}
            }

            this.fileTransfer.upload(newImage, IMAGE_URL+'api/users/'+this.user.identificador+'/image', options1)
               .then((data) => {
                 // success
                 //console.log("success");
                 this.presentToast('Imagen actualizada.');
                 this.ionViewDidEnter();

               }, (err) => {
                 // error
                 this.presentToast('Error post');
                 console.log("Error imagen muy grande");
               });
           }, error => {
                this.presentToast('Error al ajustar imágen');
                console.error('Error ajustando imagen', error);
                //this.alerts.push('Error cropping image');
             }
          );

    }, (err) => {
      console.log('error camera');
      console.log(err);
      // this.presentToast('Error camara: '+err, 10000);
    });

  }

  ionViewDidEnter() {

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

                    var random = (new Date()).toString();
                    this.image = this.user.avatar+"?cb=" + random;
                    this.imageClean = this.user.avatar;
                    this.avatar = this.user.avatar;
                    this.storage.set('avatar', this.image);

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

  tutorial() {
    this.storage.remove('tutorialComplete')
      .then(res => {
        this.router.navigateByUrl('/tutorial');
      })
      .catch(rej => {
         this.presentToast('Error tutorial.');
      });

  }

}
