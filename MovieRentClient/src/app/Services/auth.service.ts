import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private route: Router,
    private http: HttpClient,
  ) {
    this.userPayload = this.decodedToken();
  }

  readonly rootUrl = environment.rootUrl;
  token?: string;
  private userPayload: any;

  RegisterRequest(body: any) {
    return this.http.post(this.rootUrl + '/Auth/Register', body);
  }

  LoginRequest(body: any) {
    return this.http.post(this.rootUrl + '/Auth/Login', body);
  }
  storeToken(JwtToken: string) {
    this.cookieService.set('JwtToken', JwtToken);
  }
  getToken() {
    return this.cookieService.get('JwtToken');
  }
  decodedToken() {
    const JwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(JwtHelper.decodeToken(token));
    return JwtHelper.decodeToken(token);
  }
  gefullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }
  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }
  isLoggedIn(): boolean {
    return !!this.cookieService.get('JwtToken');
  }
  isLoggedInObserver() {
    return of(this.isLoggedIn());
  }
  logOut() {
    this.cookieService.deleteAll();
    localStorage.clear();
    this.route.navigate(['']);
  }

}
