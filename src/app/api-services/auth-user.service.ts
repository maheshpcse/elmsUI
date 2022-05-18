import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './apiurl.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthUserService {

    public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }

    // ******************* Mysql Database *****************************

    // EMPLOYEE authentication API Service's
    userLogin(data: any) {
        return this.http.post<any>(APIURL.EMPLOYEE_LOGIN, data);
    }

    userSignup(data: any) {
        return this.http.post<any>(APIURL.EMPLOYEE_SIGNUP, data);
    }

    userReSignIn(data: any) {
        return this.http.post<any>(APIURL.EMPLOYEE_RESIGNIN, data);
    }

    getUserToken() {
        return sessionStorage.getItem('token');
    }

    getUserId() {
        if (this.getUserRole() === 'employee') {
            return sessionStorage.getItem('userId');
        } else {
            return sessionStorage.getItem('adminId');
        }
    }

    getUserRole() {
        return sessionStorage.getItem('role');
    }

    getUserPayload() {
        const token = this.getUserToken();
        if (token) {
            const userPayload = atob(token.split('.')[1]);
            return JSON.parse(userPayload);
        } else {
            return null;
        }
    }

    isLoggedIn(): boolean {
        const userPayload = this.getUserPayload();
        if (userPayload) {
            return userPayload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    isLoggedOut(role?: any) {
        localStorage.clear();
        sessionStorage.clear();
        if (role == 'employee') {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/admin-login']);
        }
    }
}
