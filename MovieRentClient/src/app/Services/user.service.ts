import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }
  public setRolesForStore(role: string) {
    this.role$.next(role);
  }
  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullName: string) {
    this.fullName$.next(fullName);
  }
  public setUserLoginStatus() {
    this.loggedIn$.next(true);
  }
  public setUserLoginStatusFalse() {
    this.loggedIn$.next(false);
  }
  public getUserLoginStatus(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }
}
