import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-hour',
  templateUrl: './add-hour.page.html',
  styleUrls: ['./add-hour.page.scss'],
})
export class AddHourPage implements OnInit {

  constructor( private navCtrl: NavController ) { }

  ngOnInit() {
  }

  goToAddConfirm() {
    this.navCtrl.navigateForward( '/home/(reservas:add-confirm)' );
  }

}
