import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './access/login/login.component';
import { AuthGuardService } from './api-services/auth-guard.service';
import { SignupComponent } from './access/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileViewComponent } from './access/profile-view/profile-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SettingsComponent } from './access/settings/settings.component';
import { AdminLoginComponent } from './access/admin-login/admin-login.component';
import { UpdateProfileComponent } from './access/update-profile/update-profile.component';
import { ChangePasswordComponent } from './access/change-password/change-password.component';
import { LeavesHistoryComponent } from './leaves/leaves-history/leaves-history.component';
import { ApplyLeavesComponent } from './leaves/apply-leaves/apply-leaves.component';
import { ForgotPasswordComponent } from './access/forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'view-profile',
    // canActivate: [AuthGuardService],
    component: ProfileViewComponent
  },
  {
    path: 'update-profile',
    // canActivate: [AuthGuardService],
    component: UpdateProfileComponent
  },
  {
    path: 'change-password',
    // canActivate: [AuthGuardService],
    component: ChangePasswordComponent
  },
  {
    path: 'forgot-password',
    // canActivate: [AuthGuardService],
    component: ForgotPasswordComponent
  },
  {
    path: 'settings',
    // canActivate: [AuthGuardService],
    component: SettingsComponent
  },
  {
    path: 'apply-leave',
    // canActivate: [AuthGuardService],
    component: ApplyLeavesComponent
  },
  {
    path: 'leave-history',
    // canActivate: [AuthGuardService],
    component: LeavesHistoryComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
