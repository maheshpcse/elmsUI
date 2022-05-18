import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { EmployeeApisService } from 'src/app/api-services/employee-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-add-employees',
    templateUrl: './add-employees.component.html',
    styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {

    employeeId: any = null;
    firstName: any = null;
    middleName: any = null;
    lastName: any = null;
    userName: any = null;
    email: any = null;
    phoneNumber: any = null;
    dateOfBirth: any = null;
    bloodGroup: any = null;
    maritalStatus: any = null;
    address: any = null;
    cityName: any = null;
    stateName: any = null;
    countryName: any = null;
    zipCode: any = null;
    designation: any = null;
    department: any = null;
    @ViewChild('employeeForm', { static: false }) employeeFormRef: NgForm;
    submitReq: any = 0;
    pageId: any = null;
    action: any = 'Add';

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public employeeApiService: EmployeeApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['userId']) : null;
        });
        if (this.pageId) {
            this.action = 'Update';
            this.getEmployeeData();
        }
    }

    getEmployeeData() {
        this.employeeApiService.getEmployeeDataById(Number(this.pageId)).subscribe(async (response: any) => {
            console.log('Get employee data response isss', response);
            if (response && response.success) {
                if (response.data && Object.keys(response.data).length > 0) {
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

    saveEmployeeData() {
        // this.submitReq = 1;
        // setTimeout(() => {
        //     this.submitReq = 2;
        // }, 2000);
        this.submitReq = 1;

        const employeePayload = {
            action: this.action == 'Add' ? 'I' : 'U',
            data: {
                userId: Number(this.pageId) || null,
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
                dateOfJoining: moment().format('YYYY-MM-DD'),
                profileImage: null,
                role: 'employee',
                status: 1
            }
        }
        console.log('Post payload to add/update employee data isss', employeePayload);

        this.employeeApiService.addUpdateSingleEmployeeData(employeePayload).subscribe(async (response: any) => {
            console.log('Get add/update employee data response isss', response);
            if (response && response.success) {
                this.submitReq = 2;
                this.employeeFormRef.reset();
                if (this.pageId) {
                    this.getEmployeeData();
                }
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
