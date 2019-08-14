import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() titulo: string;
  @Input() avatar: string;
  public image = '';
  mainTabs = ['Dashboard', 'Tus Clases', 'Planes'];

  constructor(private authService: AuthenticationService,
              private router: Router,
              private storage: Storage,
              private location: Location
            ) {
            this.storage.get('avatar').then((value) => {
              this.image = value;
              console.log('entre navbar2:'+this.image);
            });
          }

  // passImage;

  ngOnInit() {
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
