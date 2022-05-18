import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './apiurl.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeApisService {

    public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }

    // apply leave request
    applyLeaveRequest(data: any): Observable<any> {
        this.bSubject.next(1);
        return this.http.post<any>(APIURL.APPLY_LEAVE, data);
    }

    addUpdateSingleEmployeeData(data: any) {
        return this.http.post<any>(APIURL.ADD_UPDATE_SINGLE_EMPLOYEE_DATA, data);
    }

    getEmployeesData(data: any) {
        return this.http.post<any>(APIURL.GET_EMPLOYEES_DATA, data);
    }

    getEmployeeDataById(id: any) {
        return this.http.get<any>(APIURL.GET_EMPLOYEE_DATA_BY_ID + `/${id}`);
    }

    updateEmployeeStatus(data: any) {
        return this.http.post<any>(APIURL.UPDATE_EMPLOYEE_STATUS, data);
    }

    generatePasswordToEmployee(data: any) {
        return this.http.post<any>(APIURL.GENERATED_PASSWORD_TO_EMPLOYEE, data);
    }
}
