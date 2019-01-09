import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() titulo: string;
  @Input() avatar: string;
  mainTabs = ['Dashboard', 'Tus Clases'];

  constructor(private authService: AuthenticationService,
              private navCtrl: NavController) { }

  // passImage;

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  goToPerfil() {
    this.navCtrl.navigateForward('home/(dashboard:perfil)')
  }

}
