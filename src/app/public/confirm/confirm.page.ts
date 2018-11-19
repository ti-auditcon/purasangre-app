import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  buttonIcon: any;
  title: any;
  message: any;

  constructor( public viewCtrl: ModalController,
               private navCtrl: NavController ) { }

  ngOnInit() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
    this.navCtrl.navigateForward( '/login' );
  }

}
