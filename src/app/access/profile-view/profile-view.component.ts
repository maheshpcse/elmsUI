import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { EmployeeSettingsService } from 'src/app/api-services/employee-settings.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

    public empId: any = sessionStorage.getItem('employeeId');
    employeeData: any = {
        userId: null,
        employeeId: null,
        firstName: null,
        middleName: null,
        lastName: null,
        userName: null,
        email: null,
        address: null,
        cityName: null,
        stateName: null,
        countryName: null,
        zipCode: null,
        phoneNumber: null,
        dateOfBirth: null,
        designation: null,
        department: null,
        dateOfJoining: null
    };

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authUserService: AuthUserService,
        public employeeSettingsService: EmployeeSettingsService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        // this.employeeData = {
        //     userId: 1,
        //     employeeId: 'EMP001',
        //     firstName: 'Pachapalam',
        //     middleName: 'Mahesh',
        //     lastName: '',
        //     userName: 'Mahesh Pm',
        //     email: 'maheshpm1599@gmail.com',
        //     address: 'Ram nagar, GVMC',
        //     cityName: 'Visakapatnam',
        //     stateName: 'Andhra Pradesh',
        //     countryName: 'India',
        //     zipCode: 530002,
        //     phoneNumber: 8886197968,
        //     dateOfBirth: '1997-08-04',
        //     designation: 'Software Developer',
        //     department: 'IT/Software',
        //     dateOfJoining: '2019-01-08'
        // };
        this.getEmployeeProfile();
    }

    getEmployeeProfile() {
        const empPayload = {
            emp_id: this.empId
        }
        console.log('Post payload to get employee profile data isss', empPayload);

        this.employeeSettingsService.getEmployeeProfileData(empPayload).subscribe(async (response: any) => {
            console.log('Get employee profile data response isss', response);
            if (response && response.success) {
                if (response.data && Object.keys(response.data).length > 0) {
                    this.employeeData = response.data;
                }
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

}
