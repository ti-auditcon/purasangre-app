import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, private storage: Storage, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    // const isComplete = true;
    // const isComplete = await this.storage.get('tutorialComplete');

    // if (!isComplete) {
    //   console.log("Sin tutorial");
    //   this.router.navigateByUrl('/tutorial');
    // }

    return this.auth.isAuthenticated();
  }
}
