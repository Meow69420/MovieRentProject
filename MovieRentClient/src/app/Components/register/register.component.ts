import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/Helpers/ValidateFrom';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  type: string = 'password';
  RegisterForm!: FormGroup;
  hide = true;


  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      Name: ['', Validators.compose([Validators.required, Validators.pattern("^[A-Za-z][A-Za-z ]*[A-Za-z]$")])],
      Password: ['', Validators.required]
    })
  }

  gotoLoginButton() {
    this.route.navigate(['/login']);
  }

  OnSubmit() {
    if (this.RegisterForm.valid) {
      this.auth.RegisterRequest(this.RegisterForm.value).subscribe(
        () => {
          //toasrt
          this.route.navigate(['/login']);
        }
      )
    } else {
      ValidateForm.validateAllFormFields(this.RegisterForm);
      //toast
    }
  }
}
