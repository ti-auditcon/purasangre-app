import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
// import { BottombuttonComponent } from './auth/shared/bottombutton/bottombutton.component';
// import { NavbarComponent } from './auth/shared/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, ConfirmPage],
  entryComponents: [ ConfirmPage ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    // NavbarComponent,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Crop,
    WebView,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
