import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private user: UserService,
    private route: Router
  ) { }

  public role: string = "";

  canActivate(): boolean {
    this.user.getRoleFromStore()
      .subscribe(val => {
        let roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })
    if (this.role == 'Admin') {
      return true;
    } else {
      // this.toast.error({ detail: "ERROR!", summary: "Please Login As An Admin First!", duration: 2000 });
      return false;
    }
  }
}
