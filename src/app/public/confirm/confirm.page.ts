import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

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
               private router: Router ) { }

  ngOnInit() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
    this.router.navigate( ['/login'] );
  }

}
