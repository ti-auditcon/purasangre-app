import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-hour',
  templateUrl: './edit-hour.page.html',
  styleUrls: ['./edit-hour.page.scss'],
})
export class EditHourPage implements OnInit {

  constructor( private navCtrl: NavController ) { }

  ngOnInit() {
  }

  goToEditConfirm() {
    this.navCtrl.navigateForward( '/home/(reservas:edit-confirm)' );
  }

}
