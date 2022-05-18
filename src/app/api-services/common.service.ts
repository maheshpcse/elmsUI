import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './apiurl.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CommonService {

    public role: any = sessionStorage.getItem('role');

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }

    // check server status
    getServerStatus(): Observable<any> {
        return this.http.get(APIURL.CHECK_SEVER_STATUS);
    }

    // get notifications
    getNotifications(): Observable<any> {
        return this.http.get(APIURL.GET_NOTIFICATIONS);
    }
}
