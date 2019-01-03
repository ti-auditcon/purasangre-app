//env
import { environment, SERVER_URL, IMAGE_URL} from '../../../../environments/environment';
//imports
import { Component} from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
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

  imageURI:any;
  imageFileName:any;

  constructor( private storage: Storage,
               private authService: AuthenticationService,
               private http: HttpClient,
               private camera: Camera,
               private crop: Crop,
               private platform: Platform,
               private webview: WebView,
               private transfer: FileTransfer,
               public toastController: ToastController
             ) {}

  base64Image:any;
  preImage:any;
  public fileTransfer: FileTransferObject = this.transfer.create();

  async presentToast(text = 'Error') {
     const toast = await this.toastController.create({
       message: text,
       duration: 2500
     });
     toast.present();
   }

  // selectImageFromCamera()
  // {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     targetWidth: 1000,
  //     targetHeight: 1000,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
  //     correctOrientation: true,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //
  //   this.camera.getPicture(options).then((imageData) => {
  //   this.preImage = imageData;
  //   console.log('original');
  //   console.log(imageData);
  //
  //   this.crop.crop(this.preImage, {quality: 100})
  //   .then(
  //     newImage => {
  //       console.log('crop');
  //       console.log(newImage);
  //       //this.base64Image = this.webview.convertFileSrc(newImage);
  //       this.base64Image = 'data:image/jpeg;base64,' + newImage;
  //
  //       this.storage.get(TOKEN_KEY).then((value) => {
  //
  //         let Bearer = value;
  //       //  console.log(this.textModel);
  //         // let data=JSON.stringify({
  //         //   image: newImage,
  //         // });
  //         console.log(this.base64Image);
  //         let data = new FormData();
  //         data.append('file', this.base64Image)
  //         console.log(data);
  //         const httpOptions = {
  //           headers: new HttpHeaders({
  //             // 'Content-Type': 'multipart/form-data', //updated
  //             // 'Authorization': 'Bearer '+ Bearer//updated
  //
  //           })};
  //
  //           this.http.post("http://purasangre.asomic.com/api/users/1/image",data, httpOptions)
  //               .subscribe((result: any) => {
  //                 console.log('me responfio profile/image');
  //             //    this.alerts.push('me responfio profile/image');
  //                 console.log(result);
  //             //    this.alerts.push(JSON.stringify(result));
  //                 // this.errors = JSON.stringify(result);
  //               },
  //               err =>{
  //                 console.log('error imagen servidor');
  //                 console.log(err);
  //                 this.errors = JSON.stringify(err);
  //               //  this.alerts.push(JSON.stringify(err));
  //               });
  //       });
  //
  //
  //     }, error => {
  //        console.error('Error cropping image', error);
  //        //this.alerts.push('Error cropping image');
  //       }
  //    );
  //    }, (err) => {
  //      console.log(err);
  //    });
  //  }

  selectImageFromCamera() {
    this.presentToast('images!!!');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
    }

    this.camera.getPicture(options).then((imageData) => {
        this.crop.crop(imageData, {quality: 100})
        .then(
          newImage => {
            //this.imageURI = imageData;
            let options1: FileUploadOptions = {
             fileKey: 'image',
             fileName: 'avatar.jpg',
             headers: {}
            }

            this.fileTransfer.upload(newImage, IMAGE_URL+'/api/users/'+this.user.id+'/image', options1)
             .then((data) => {
               // success
               console.log("success");
               this.presentToast('Imagen actualizada.');
               this.ionViewDidEnter();

             }, (err) => {
               // error
               this.presentToast('Error post: '+err);
               console.log("error"+JSON.stringify(err));
             });
           }, error => {
              this.presentToast('Error crop: '+error);
              console.error('Error cropping image', error);
              //this.alerts.push('Error cropping image');
             }
          );

    }, (err) => {
      console.log('error camera');
      console.log(err);
      this.presentToast('Error camara: '+err);
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
                    console.log('entre');
                    console.log(this.user);
                    console.log(this.user.rels.active_plan.href);
                    var random = (new Date()).toString();
                    this.image = this.user.avatar+"?cb=" + random;

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
