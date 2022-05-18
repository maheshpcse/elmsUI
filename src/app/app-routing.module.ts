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
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddEmployeesComponent } from './admin/employees/add-employees/add-employees.component';
import { ManageEmployeesComponent } from './admin/employees/manage-employees/manage-employees.component';
import { AddDepartmentsComponent } from './admin/departments/add-departments/add-departments.component';
import { ManageDepartmentsComponent } from './admin/departments/manage-departments/manage-departments.component';
import { AddLeavetypesComponent } from './admin/leavetypes/add-leavetypes/add-leavetypes.component';
import { ManageLeavetypesComponent } from './admin/leavetypes/manage-leavetypes/manage-leavetypes.component';
import { AllLeavesComponent } from './admin/leave-management/all-leaves/all-leaves.component';
import { PendingLeavesComponent } from './admin/leave-management/pending-leaves/pending-leaves.component';
import { ApprovedLeavesComponent } from './admin/leave-management/approved-leaves/approved-leaves.component';
import { RejectedLeavesComponent } from './admin/leave-management/rejected-leaves/rejected-leaves.component';
import { DashboardViewComponent } from './admin/admin-dashboard/dashboard-view/dashboard-view.component';
import { EmployeesViewComponent } from './admin/employees/employees-view/employees-view.component';
import { DepartmentsViewComponent } from './admin/departments/departments-view/departments-view.component';
import { LeavetypesViewComponent } from './admin/leavetypes/leavetypes-view/leavetypes-view.component';
import { LeaveManagementViewComponent } from './admin/leave-management/leave-management-view/leave-management-view.component';
import { BulkUploadEmployeeComponent } from './admin/employees/bulk-upload-employee/bulk-upload-employee.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { EmployeeViewRequestsComponent } from './admin/employee-view-requests/employee-view-requests.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePageComponent
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
        path: 'admin-login',
        component: AdminLoginComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    // ************ Employee routes ******************
    {
        path: 'view-profile',
        canActivate: [AuthGuardService],
        component: ProfileViewComponent
    },
    {
        path: 'update-profile',
        canActivate: [AuthGuardService],
        component: UpdateProfileComponent
    },
    {
        path: 'change-password',
        canActivate: [AuthGuardService],
        component: ChangePasswordComponent
    },
    {
        path: 'apply-leave',
        canActivate: [AuthGuardService],
        component: ApplyLeavesComponent
    },
    {
        path: 'leave-history',
        canActivate: [AuthGuardService],
        component: LeavesHistoryComponent
    },
    // ************ Admin routes ******************
    {
        path: 'admin-profile',
        canActivate: [AuthGuardService],
        component: AdminProfileComponent
    },
    {
        path: 'admin-settings',
        canActivate: [AuthGuardService],
        component: AdminSettingsComponent
    },
    {
        path: 'employee-view-requests',
        canActivate: [AuthGuardService],
        component: EmployeeViewRequestsComponent
    },
    {
        path: 'admin-dashboard',
        canActivate: [AuthGuardService],
        component: AdminDashboardComponent
    },
    {
        path: 'dashboard-employee-view/:userId',
        canActivate: [AuthGuardService],
        component: DashboardViewComponent
    },
    {
        path: 'add-employee',
        canActivate: [AuthGuardService],
        component: AddEmployeesComponent
    },
    {
        path: 'bulk-upload-employee',
        canActivate: [AuthGuardService],
        component: BulkUploadEmployeeComponent
    },
    {
        path: 'manage-employee',
        canActivate: [AuthGuardService],
        component: ManageEmployeesComponent
    },
    {
        path: 'employees-view/:userId',
        canActivate: [AuthGuardService],
        component: EmployeesViewComponent
    },
    {
        path: 'add-department',
        canActivate: [AuthGuardService],
        component: AddDepartmentsComponent
    },
    {
        path: 'manage-department',
        canActivate: [AuthGuardService],
        component: ManageDepartmentsComponent
    },
    {
        path: 'departments-view/:deptId',
        canActivate: [AuthGuardService],
        component: DepartmentsViewComponent
    },
    {
        path: 'add-leavetype',
        canActivate: [AuthGuardService],
        component: AddLeavetypesComponent
    },
    {
        path: 'manage-leavetype',
        canActivate: [AuthGuardService],
        component: ManageLeavetypesComponent
    },
    {
        path: 'leavetypes-view/:leaveTypeId',
        canActivate: [AuthGuardService],
        component: LeavetypesViewComponent
    },
    {
        path: 'all-leaves',
        canActivate: [AuthGuardService],
        component: AllLeavesComponent
    },
    {
        path: 'pending-leaves',
        canActivate: [AuthGuardService],
        component: PendingLeavesComponent
    },
    {
        path: 'approved-leaves',
        canActivate: [AuthGuardService],
        component: ApprovedLeavesComponent
    },
    {
        path: 'rejected-leaves',
        canActivate: [AuthGuardService],
        component: RejectedLeavesComponent
    },
    {
        path: 'leave-management-view/:leaveTypeId',
        canActivate: [AuthGuardService],
        component: LeaveManagementViewComponent
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
