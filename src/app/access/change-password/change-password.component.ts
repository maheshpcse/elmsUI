import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { EmployeeSettingsService } from 'src/app/api-services/employee-settings.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    public empId: any = sessionStorage.getItem('employeeId');
    currentPassword: any = null;
    newPassword: any = null;
    confirmPassword: any = null;
    @ViewChild('passwordForm', { static: false }) passwordFormRef: NgForm;
    submitReq: any = 0;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authUserService: AuthUserService,
        public employeeSettingsService: EmployeeSettingsService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
    }

    openSubmitModal() {
        if (this.passwordFormRef.invalid) {
            return this.toastr.errorToastr('Please fill the required fields');
        }
        if (this.newPassword !== this.confirmPassword) {
            return this.toastr.errorToastr('New password and Confirm password is not match');
        }
        $('#submitReqModal').modal('show');
        this.submitReq = 0;
    }

    changeNewPassword() {
        this.submitReq = 1;

        const passwordPayload = {
            emp_id: this.empId,
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
        }
        console.log('Post payload to update new password data isss', passwordPayload);

        this.employeeSettingsService.updateNewPasswordToEmployee(passwordPayload).subscribe(async (response: any) => {
            console.log('Get update new password data response isss', response);
            if (response && response.success) {
                this.submitReq = 2;
                this.resetForm();
            } else {
                this.toastr.errorToastr(response.message);
                this.submitReq = 3;
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.submitReq = 3;
        });
    }

    resetForm() {
        if (this.passwordFormRef) {
            this.passwordFormRef.reset();
        }
        this.currentPassword = null;
        this.newPassword = null;
        this.confirmPassword = null;
    }

}
