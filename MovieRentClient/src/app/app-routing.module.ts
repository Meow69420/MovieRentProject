import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './Components/register/register.component'
import { DashbordComponent } from './Components/dashbord/dashbord.component';
import { AdminDashbordComponent } from './Components/Admin/admin-dashbord/admin-dashbord.component';
import { AuthGuard } from './Guards/auth.guard';
import { AdminGuard } from './Guards/admin.guard';
import { AuthDeactiveGuard } from './Guards/auth-deactive.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashbord', pathMatch: 'full' },
  { path: 'dashbord', component: DashbordComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthDeactiveGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthDeactiveGuard] },
  { path: 'admin', component: AdminDashbordComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
