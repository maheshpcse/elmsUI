import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './apiurl.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthAdminService {

    public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }

    // ******************* Mysql Database *****************************

    // ADMIN authentication API Service's
    adminLogin(data: any) {
        return this.http.post<any>(APIURL.ADMIN_LOGIN, data);
    }

    adminReSignIn(data: any) {
        return this.http.post<any>(APIURL.ADMIN_RESIGNIN, data);
    }

    getAdminToken() {
        return sessionStorage.getItem('token');
    }

    getAdminId() {
        if (this.getAdminRole() === 'admin') {
            return sessionStorage.getItem('adminId');
        } else {
            return sessionStorage.getItem('userId');
        }
    }

    getAdminRole() {
        return sessionStorage.getItem('role');
    }

    getAdminPayload() {
        const token = this.getAdminToken();
        if (token) {
            const adminPayload = atob(token.split('.')[1]);
            return JSON.parse(adminPayload);
        } else {
            return null;
        }
    }

    isLoggedIn(): boolean {
        const adminPayload = this.getAdminPayload();
        if (adminPayload) {
            return adminPayload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    isLoggedOut(role?: any) {
        localStorage.clear();
        sessionStorage.clear();
        if (role == 'admin') {
            this.router.navigate(['/admin-login']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}
