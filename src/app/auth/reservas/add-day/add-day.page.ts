import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.page.html',
  styleUrls: ['./add-day.page.scss'],
})
export class AddDayPage implements OnInit {

  constructor( private navCtrl: NavController ) { }

  ngOnInit() {
  }

  goToAddHour() {
    this.navCtrl.navigateForward('/home/(reservas:add-hour)');
  }

}
