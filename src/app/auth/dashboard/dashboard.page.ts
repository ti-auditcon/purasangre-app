import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  go() {
    this.router.navigate(['/perfil']);
  }

  verWOD() {
    // this.router.navigate(['/clases/clase']);
    this.navCtrl.navigateForward( '/home/(clases:hoy)' );
    // this.router.navigate(['/home/(clases:clase)']);
  }

}
