import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    spinner: any = false;
    formStep: any = 1;
    firstName: any = null;
    lastName: any = null;
    userName: any = null;
    email: any = null;
    password: any = null;
    confirmPassword: any = null;

    constructor(
        public router: Router,
        public authUserService: AuthUserService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
    }

    selectStep(step?: any) {
        if (step == 2) {
            if (this.setFormOneDisable()) {
                return this.toastr.warningToastr('Please fill the required fields.');
            }
            this.formStep = Number(step);
        } else if (step == 1) {
            this.formStep = Number(step);
        }
    }

    userSignup() {
        this.spinner = true;
        // setTimeout(() => {
        //     this.router.navigate(['/login']);
        //     this.spinner = false;
        // }, 2000);

        if (this.setFormOneDisable() || this.setFormTwoDisable()) {
            this.spinner = false;
            return this.toastr.warningToastr('Please fill the required fields.');
        }

        if (this.checkPasswords()) {
            this.spinner = false;
            return this.toastr.warningToastr('Password and Confirm Password is not same.');
        }

        const empPayload = {
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            email: this.email,
            password: this.password,
            role: 'employee',
            status: 1
        }
        console.log('Post payload to get employee signup data isss', empPayload);

        this.authUserService.userSignup(empPayload).subscribe(async (response: any) => {
            console.log('Get employee signup data response isss', response);
            if (response && response.success) {
                this.toastr.successToastr(response.message);
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 1000);
            } else {
                this.toastr.errorToastr(response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.spinner = false;
        });
    }

    setFormOneDisable() {
        if (!this.firstName || !this.lastName || !this.userName) {
            return true;
        } else {
            return false;
        }
    }

    setFormTwoDisable() {
        if (!this.email || !this.password || !this.confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

    checkPasswords() {
        if (this.password !== this.confirmPassword) {
            return true;
        } else {
            return false;
        }
    }

}
