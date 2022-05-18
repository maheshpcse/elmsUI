import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    spinner: any = false;
    employeeId: any = null;
    password: any = null;

    constructor(
        public router: Router,
        public authUserService: AuthUserService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
    }

    userLogin() {
        this.spinner = true;
        // localStorage.setItem('role', 'user');
        // sessionStorage.setItem('role', 'user');
        // setTimeout(() => {
        //     this.router.navigate(['/view-profile']);
        //     this.spinner = false;
        // }, 2000);

        if (this.setFormDisable()) {
            this.spinner = false;
            return this.toastr.warningToastr('Please fill the required fields.');
        }

        const empPayload = {
            employeeId: this.employeeId,
            password: this.password
        }
        console.log('Post payload to get employee login data isss', empPayload);

        this.authUserService.userLogin(empPayload).subscribe(async (response: any) => {
            console.log('Get employee login data response isss', response);
            if (response && response.success) {
                this.toastr.successToastr(response.message);
                for (const [key, value] of Object.entries(response.data)) {
                    let newValue: any = value;
                    localStorage.setItem(key, newValue);
                    sessionStorage.setItem(key, newValue);
                }
                setTimeout(() => {
                    this.router.navigate(['/view-profile']);
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
        if (!this.employeeId || !this.password) {
            return true;
        } else {
            return false;
        }
    }

}
