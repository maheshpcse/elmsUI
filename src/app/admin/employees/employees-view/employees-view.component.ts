import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { EmployeeApisService } from 'src/app/api-services/employee-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';

@Component({
    selector: 'app-employees-view',
    templateUrl: './employees-view.component.html',
    styleUrls: ['./employees-view.component.css']
})
export class EmployeesViewComponent implements OnInit {

    spinner: any = false;
    empData: any = {
        // userId: 1,
        // employeeId: 'EMP000',
        // firstName: 'Test first',
        // middleName: 'Test middle',
        // lastName: 'Test last',
        // userName: 'Test user',
        // email: 'test@gmail.com',
        // address: '1/12-123, test address, test address',
        // cityName: 'test city',
        // stateName: 'test state',
        // countryName: 'test country',
        // zipCode: '000111',
        // phoneNumber: '8886197968',
        // dateOfBirth: moment().format('YYYY-MM-DD'),
        // designation: 'Test designation',
        // department: 'Test department',
        // dateOfJoining: moment().format('YYYY-MM-DD'),
        // profileImage: null,
        // bloodGroup: 'AB+',
        // maritalStatus: 'Single',
        // role: 'employee',
        // status: 1
    };
    pageId: any = null;
    transformData: any = null;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public employeeApiService: EmployeeApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.route.params.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['userId']) : null;
        });
        this.getEmployeeData();
    }

    goBackTo() {
        this.router.navigate(['/manage-employee']);
    }

    getEmployeeData() {
        this.spinner = true;
        this.employeeApiService.getEmployeeDataById(Number(this.pageId)).subscribe(async (response: any) => {
            console.log('Get employee data response isss', response);
            if (response && response.success) {
                this.empData = response.data || {};
            } else {
                this.toastr.errorToastr(response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.spinner = false;
        });
    }

}
