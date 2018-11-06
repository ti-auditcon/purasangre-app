//env
import { environment, SERVER_URL} from '../../../../environments/environment';
//imports
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

let TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public user: any = '';
  public user_plan: any = '';

  constructor(private storage: Storage, private authService: AuthenticationService, private http: HttpClient) {

  }


  ngOnInit() {
    this.storage.get(TOKEN_KEY).then((value) => {
      //console.log(value);
      let Bearer = value;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer '+ Bearer//updated
        })};

      this.http.get(SERVER_URL+"/profile", httpOptions)
                  .subscribe((result: any) => {
                    this.user = result.data;
                    console.log('entre');
                    console.log(this.user);
                    console.log(this.user.rels.active_plan.href);
                    this.http.get(this.user.rels.active_plan.href, httpOptions)
                                .subscribe((result: any) => {
                                  console.log('entre plan activo');
                                  this.user_plan = result.data;
                                  console.log(this.user_plan);

                                 });
                   });


    });

  }
  logout() {
    this.authService.logout();
  }

}
