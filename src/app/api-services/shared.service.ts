import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
declare var $: any;


@Injectable({
    providedIn: 'root'
})
export class SharedService {

    public role: any = sessionStorage.getItem('role');

    constructor(
        private http: HttpClient,
        public router: Router
    ) { }
}
