import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-pago-detail',
  templateUrl: './plan-detail.page.html',
  styleUrls: ['./plan-detail.page.scss'],
})
export class PlanDetailPage implements OnInit {
  buttonFixIOS: string = "";
  buttonFixAndroid: string = "";

  constructor(
    private plt: Platform
  ) {
    if (this.plt.is('ios')) {
      //Si es iOS
      this.buttonFixIOS = "button-fix-ios";
      this.buttonFixAndroid = "display-none";
    } else {
      //Si es Android
      this.buttonFixIOS = "display-none";
      this.buttonFixAndroid = "button-fix";
    }
  }

  ngOnInit() {
  }

}
