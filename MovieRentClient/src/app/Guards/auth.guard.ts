import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';;
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private route: Router,
  ) { }

  public role: string = "";

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      // this.toast.error({ detail: "ERROR!", summary: "Please Login First!", duration: 1000 });
      this.route.navigate(['login']);
      return false;
    }
  }
}
