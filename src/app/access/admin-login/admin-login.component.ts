import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from './../../api-services/auth-admin.service';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

    spinner: any = false;
    nameOrEmail: any = null;
    password: any = null;

    constructor(
        public router: Router,
        public authUserService: AuthUserService,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
    }

    adminLogin() {
        this.spinner = true;
        // localStorage.setItem('role', 'admin');
        // sessionStorage.setItem('role', 'admin');
        // setTimeout(() => {
        //     this.router.navigate(['/admin-dashboard']);
        //     this.spinner = false;
        // }, 2000);

        if (this.setFormDisable()) {
            this.spinner = false;
            return this.toastr.warningToastr('Please fill the required fields.');
        }

        const empPayload = {
            nameOrEmail: this.nameOrEmail,
            password: this.password
        }
        console.log('Post payload to get admin login data isss', empPayload);

        this.authAdminService.adminLogin(empPayload).subscribe(async (response: any) => {
            console.log('Get admin login data response isss', response);
            if (response && response.success) {
                this.toastr.successToastr(response.message);
                for (const [key, value] of Object.entries(response.data)) {
                    let newValue: any = value;
                    localStorage.setItem(key, newValue);
                    sessionStorage.setItem(key, newValue);
                }
                setTimeout(() => {
                    this.router.navigate(['/admin-dashboard']);
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

    setFormDisable() {
        if (!this.nameOrEmail || !this.password) {
            return true;
        } else {
            return false;
        }
    }

}
