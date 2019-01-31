import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';

import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfirmPage } from './public/confirm/confirm.page';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ChartsModule } from 'ng2-charts';

//firebase
import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';

//firebase config
const config = {
    apiKey: "AIzaSyB05wkjbGZlw0YbENGO-lm0_TgjZEfvTYk",
    authDomain: "pura-sangre-crossfit.firebaseapp.com",
    databaseURL: "https://pura-sangre-crossfit.firebaseio.com",
    projectId: "pura-sangre-crossfit",
    storageBucket: "pura-sangre-crossfit.appspot.com",
    messagingSenderId: "74713033262"
  };





// import { BottombuttonComponent } from './auth/shared/bottombutton/bottombutton.component';
// import { NavbarComponent } from './auth/shared/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, ConfirmPage],
  entryComponents: [ ConfirmPage ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    // NavbarComponent,
    HttpClientModule,
    ChartsModule,
    //firebase
    AngularFireModule.initializeApp(config),
    // AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Crop,
    WebView,
    FileTransfer,
    //FileUploadOptions,
    //FileTransferObject,
    File,
    //firebase
    Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
