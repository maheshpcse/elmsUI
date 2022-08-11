import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './apiurl.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeSettingsService {

    public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }

    updateNewPasswordToEmployee(data: any) {
        return this.http.post<any>(APIURL.UPDATE_NEW_PASSWORD_TO_EMPLOYEE, data);
    }

    getEmployeeProfileData(data: any) {
        return this.http.post<any>(APIURL.GET_EMPLOYEE_PROFILE_DATA, data);
    }

    updateEmployeeProfileData(data: any) {
        return this.http.post<any>(APIURL.UPDATE_EMPLOYEE_PROFILE_DATA, data);
    }
}
