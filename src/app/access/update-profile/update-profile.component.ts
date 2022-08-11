import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { EmployeeSettingsService } from 'src/app/api-services/employee-settings.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-update-profile',
    templateUrl: './update-profile.component.html',
    styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

    public empId: any = sessionStorage.getItem('employeeId');
    userId: any = null;
    employeeId: any = null;
    firstName: any = null;
    middleName: any = null;
    lastName: any = null;
    userName: any = null;
    email: any = null;
    bloodGroup: any = null;
    maritalStatus: any = null;
    address: any = null;
    cityName: any = null;
    stateName: any = null;
    countryName: any = null;
    zipCode: any = null;
    phoneNumber: any = null;
    dateOfBirth: any = null;
    designation: any = null;
    department: any = null;
    dateOfJoining: any = null;
    @ViewChild('employeeForm', { static: false }) employeeFormRef: NgForm;
    submitReq: any = 0;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authUserService: AuthUserService,
        public employeeSettingsService: EmployeeSettingsService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        // this.employeeId = 'EMP001';
        // this.firstName = 'Pachapalam';
        // this.middleName = 'Mahesh';
        // this.lastName = '';
        // this.userName = 'Mahesh Pm';
        // this.email = 'maheshpm1599@gmail.com';
        // this.address = 'Ram nagar, GVMC';
        // this.cityName = 'Visakapatnam';
        // this.stateName = 'Andhra Pradesh';
        // this.countryName = 'India';
        // this.zipCode = 530002;
        // this.phoneNumber = 8886197968;
        // this.dateOfBirth = '1997-08-04';
        // this.designation = 'Software Developer';
        // this.department = 'IT/Software';
        // this.dateOfJoining = '2019-08-01';
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
                    this.userId = response.data['userId'];
                    this.employeeId = response.data['employeeId'];
                    this.firstName = response.data['firstName'];
                    this.middleName = response.data['middleName'];
                    this.lastName = response.data['lastName'];
                    this.userName = response.data['userName'];
                    this.email = response.data['email'];
                    this.phoneNumber = response.data['phoneNumber'];
                    this.dateOfBirth = moment(response.data['dateOfBirth']).format('YYYY-MM-DD');
                    this.bloodGroup = response.data['bloodGroup'];
                    this.maritalStatus = response.data['maritalStatus'];
                    this.address = response.data['address'];
                    this.cityName = response.data['cityName'];
                    this.stateName = response.data['stateName'];
                    this.countryName = response.data['countryName'];
                    this.zipCode = response.data['zipCode'];
                    this.designation = response.data['designation'];
                    this.department = response.data['department'];
                    this.dateOfJoining = moment(response.data['dateOfJoining']).format('YYYY-MM-DD');
                }
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

    openSubmitModal() {
        if (this.employeeFormRef.invalid) {
            return this.toastr.errorToastr('Please fill the required fields');
        }
        $('#submitReqModal').modal('show');
        this.submitReq = 0;
    }

    updateProfileData() {
        // this.submitReq = 1;
        // setTimeout(() => {
        //     this.submitReq = 2;
        // }, 2000);
        this.submitReq = 1;

        const employeePayload = {
            action: 'U',
            data: {
                userId: this.userId,
                employeeId: this.employeeId,
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                userName: this.userName,
                email: this.email,
                phoneNumber: this.phoneNumber.toString(),
                dateOfBirth: moment(this.dateOfBirth).format('YYYY-MM-DD'),
                bloodGroup: this.bloodGroup,
                maritalStatus: this.maritalStatus,
                address: this.address,
                cityName: this.cityName,
                stateName: this.stateName,
                countryName: this.countryName,
                zipCode: this.zipCode.toString(),
                designation: this.designation,
                department: this.department,
                dateOfJoining: moment(this.dateOfJoining).format('YYYY-MM-DD'),
                profileImage: null,
                role: 'employee',
                status: 1
            }
        }
        console.log('Post payload to update employee profile data isss', employeePayload);

        this.employeeSettingsService.updateEmployeeProfileData(employeePayload).subscribe(async (response: any) => {
            console.log('Get update employee profile data response isss', response);
            if (response && response.success) {
                this.submitReq = 2;
                this.employeeFormRef.reset();
                this.getEmployeeProfile();
            } else {
                this.toastr.errorToastr(response.message);
                this.submitReq = 3;
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.submitReq = 3;
        });
    }

}
