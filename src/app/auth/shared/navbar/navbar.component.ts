import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
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
  mainTabs = ['Dashboard', 'Tus Clases'];

  constructor(private authService: AuthenticationService,
              private router: Router,
              private location: Location
            ) { }

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
