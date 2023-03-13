import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/ValidateFrom';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  type: string = 'password';
  isText: boolean = false;
  iconShowHide: string = 'visibility';
  loginForm!: FormGroup;
  false: boolean = false;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: AuthService,
    private user: UserService
  ) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      Password: ['', Validators.required]
    })
  }
  gotoRegisterButton() {
    this.route.navigate(['/register']);
  }

  OnSubmit() {
    if (this.loginForm.valid) {
      this.auth.LoginRequest(this.loginForm.value).subscribe({
        next: (data: any) => {
          this.auth.token = (data.data);
          console.log(data)
          localStorage.clear();
          this.auth.storeToken(data.data);
          this.user.setUserLoginStatus();
          const tokenPayload = this.auth.decodedToken();
          this.user.setFullNameForStore(tokenPayload.name);
          this.user.setRolesForStore(tokenPayload.role);
          this.route.navigate(['/dashbord']);
        },
        error: (err) => {
          //this.toast.error({})
          //console.log(err);
        }
      })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      //toast
      //alert('invalid');
    }
  }

}
