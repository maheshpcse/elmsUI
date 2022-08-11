import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './apiurl.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LeavetypeApisService {

    public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }

    addUpdateLeavetypeData(data: any) {
        return this.http.post<any>(APIURL.ADD_UPDATE_LEAVETYPE_DATA, data);
    }

    getLeavetypesData(data: any) {
        return this.http.post<any>(APIURL.GET_LEAVETYPES_DATA, data);
    }

    geLeavetypeDataById(id: any) {
        return this.http.get<any>(APIURL.GET_LEAVETYPE_DATA_BY_ID + `/${id}`);
    }

    updateLeavetypeStatus(data: any) {
        return this.http.post<any>(APIURL.UPDATE_LEAVETYPE_STATUS, data);
    }
}
