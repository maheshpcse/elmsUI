import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './apiurl.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LeavemanagementApisService {

    public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }

    getEmployeeLeavetypesData(data: any) {
        return this.http.post<any>(APIURL.GET_EMPLOYEE_LEAVETYPES_DATA, data);
    }

    addUpdateEmployeeAppliedLeaveData(data: any) {
        return this.http.post<any>(APIURL.ADD_UPDATE_EMPLOYEE_LEAVE_APPLIED_DATA, data);
    }

    getEmployeeAllLeaveHistoryData(data: any) {
        return this.http.post<any>(APIURL.GET_EMPLOYEE_ALL_LEAVE_HISTORY_DATA, data);
    }

    getEmployeeLeaveHistoryDataById(id: any) {
        return this.http.get<any>(APIURL.GET_EMPLOYEE_LEAVE_HISTORY_DATA_BY_ID + `/${id}`);
    }

    deleteLeaveRequestToEmployee(data: any) {
        return this.http.post<any>(APIURL.CANCEL_LEAVE_REQUEST_TO_EMPLOYEE, data);
    }
}
