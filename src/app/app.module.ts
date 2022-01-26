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
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddDepartmentsComponent } from './admin/departments/add-departments/add-departments.component';
import { ManageDepartmentsComponent } from './admin/departments/manage-departments/manage-departments.component';
import { AddLeavetypesComponent } from './admin/leavetypes/add-leavetypes/add-leavetypes.component';
import { ManageLeavetypesComponent } from './admin/leavetypes/manage-leavetypes/manage-leavetypes.component';
import { AddEmployeesComponent } from './admin/employees/add-employees/add-employees.component';
import { ManageEmployeesComponent } from './admin/employees/manage-employees/manage-employees.component';
import { AllLeavesComponent } from './admin/leave-management/all-leaves/all-leaves.component';
import { PendingLeavesComponent } from './admin/leave-management/pending-leaves/pending-leaves.component';
import { ApprovedLeavesComponent } from './admin/leave-management/approved-leaves/approved-leaves.component';
import { RejectedLeavesComponent } from './admin/leave-management/rejected-leaves/rejected-leaves.component';
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
    ForgotPasswordComponent,
    AdminDashboardComponent,
    AddDepartmentsComponent,
    ManageDepartmentsComponent,
    AddLeavetypesComponent,
    ManageLeavetypesComponent,
    AddEmployeesComponent,
    ManageEmployeesComponent,
    AllLeavesComponent,
    PendingLeavesComponent,
    ApprovedLeavesComponent,
    RejectedLeavesComponent
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
