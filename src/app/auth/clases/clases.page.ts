//env
import { environment, SERVER_URL} from '../../../environments/environment';
//imports
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-clases',
  templateUrl: 'clases.page.html',
  styleUrls: ['clases.page.scss']
})
export class ClasesPage {

  constructor(private storage: Storage,  private http: HttpClient, private navCtrl: NavController) {}



  ngOnInit() {

  }

  irAClase(){
    // this.router.navigateByUrl( '/home/(clases:clase)' );
    this.navCtrl.navigateForward( '/home/(clases:clase)' );
  }

  irAClaseHoy(){
    this.navCtrl.navigateForward( '/home/(clases:hoy)' );
  }

}
