import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from './auth-user.service';
import { AuthAdminService } from './auth-admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    userId: any = sessionStorage.getItem('userId');
    adminId: any = sessionStorage.getItem('adminId');
    role: any = sessionStorage.getItem('role');

    constructor(
        private router: Router,
        public authUserService: AuthUserService,
        public authAdminService: AuthAdminService,
        public toastr: ToastrManager
    ) { }

    canActivate(): boolean {
        if (this.role === 'employee' || this.authUserService.isLoggedIn()) {
            return true;
        } else if (this.role === 'admin' || this.authAdminService.isLoggedIn()) {
            return true;
        } else {
            this.toastr.warningToastr('You are not authenticated or authorized user, Please login or signup.');
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['/login']);
            return false;
        }
    }
}
