import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() titulo: string;
  @Input() avatar: string;
  mainTabs = ['Dashboard', 'Tus Clases'];

  constructor(private authService: AuthenticationService,
              private router: Router,
              private storage: Storage,
              private location: Location
            ) { }

  // passImage;

  ionViewDidEnter() {
    this.storage.get('avatar').then((value) => {
      this.avatar = value;
      console.log('Entre '+this.avatar)
    });
  }

  logout() {
    this.authService.logout();
  }

  goToPerfil() {
    this.router.navigate(['/home/perfil']);
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
