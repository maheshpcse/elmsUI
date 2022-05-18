import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './apiurl.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DepartmentApisService {

    public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }

    addUpdateDepartmentData(data: any) {
        return this.http.post<any>(APIURL.ADD_UPDATE_DEPARTMENT_DATA, data);
    }

    getDepartmentsData(data: any) {
        return this.http.post<any>(APIURL.GET_DEPARTMENTS_DATA, data);
    }

    getDepartmentDataById(id: any) {
        return this.http.get<any>(APIURL.GET_DEPARTMENT_DATA_BY_ID + `/${id}`);
    }

    updateDepartmentStatus(data: any) {
        return this.http.post<any>(APIURL.UPDATE_DEPARTMENT_STATUS, data);
    }
}
