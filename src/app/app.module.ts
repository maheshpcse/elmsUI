import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgOtpInputModule } from  'ng-otp-input';

import { AppRoutingModule } from './app-routing.module';
import { AuthUserService } from './api-services/auth-user.service';
import { AuthGuardService } from './api-services/auth-guard.service';
import { AuthInterceptorService } from './api-services/auth-interceptor.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';
import { ProfileViewComponent } from './access/profile-view/profile-view.component';
import { DataTruncatePipe } from './app-services/data-truncate.pipe';
import { DataTransferPipe } from './app-services/data-transfer.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import { SettingsComponent } from './access/settings/settings.component';
import { AdminLoginComponent } from './access/admin-login/admin-login.component';
import { ManageLeavesComponent } from './leaves/manage-leaves/manage-leaves.component';
import { ChangePasswordComponent } from './access/change-password/change-password.component';
import { UpdateProfileComponent } from './access/update-profile/update-profile.component';
import { LeavesHistoryComponent } from './leaves/leaves-history/leaves-history.component';
import { ApplyLeavesComponent } from './leaves/apply-leaves/apply-leaves.component';
import { ForgotPasswordComponent } from './access/forgot-password/forgot-password.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidemenuComponent,
    TopmenuComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    ProfileViewComponent,
    DataTruncatePipe,
    DataTransferPipe,
    HomePageComponent,
    SettingsComponent,
    AdminLoginComponent,
    ManageLeavesComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    LeavesHistoryComponent,
    ApplyLeavesComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    CalendarModule,
    ToastrModule.forRoot(),
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgOtpInputModule
  ],
  providers: [
    AuthUserService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
