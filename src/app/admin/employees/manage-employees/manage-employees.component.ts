import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { EmployeeApisService } from 'src/app/api-services/employee-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
declare var $: any;
@Component({
    selector: 'app-manage-employees',
    templateUrl: './manage-employees.component.html',
    styleUrls: ['./manage-employees.component.css']
})
export class ManageEmployeesComponent implements OnInit {

    spinner: any = false;
    showFilter: any = false;
    submitReq: any = 0;
    limit: any = 5;
    page: any = 1;
    filterQuery: any = '';
    filterStatus: any = 'all';
    filterDepartment: any = 'all';
    count: any = 0;
    totalPages: any = 0;
    pager: any = [];
    employeesList: any = [
        // { userId: 1, emp_id: 'EMP001', fullName: 'employeeOne', designation: 'Web Developer', department: 'IT/Web', mobile: '9000000143', status: 1 },
        // { userId: 2, emp_id: 'EMP002', fullName: 'employeeTwo', designation: 'Soft Developer', department: 'IT/Software', mobile: '7661876696', status: 0 },
        // { userId: 3, emp_id: 'EMP003', fullName: 'employeeThree', designation: 'Angular Developer', department: 'IT/Web', mobile: '9949393483', status: 1 },
        // { userId: 4, emp_id: 'EMP004', fullName: 'employeeFour', designation: 'Node.js Developer', department: 'IT/Web', mobile: '8332005225', status: 2 },
        // { userId: 5, emp_id: 'EMP005', fullName: 'employeeFive', designation: 'Andriod Developer', department: 'IT/Hardware', mobile: '9876512340', status: 1 },
        // { userId: 6, emp_id: 'EMP006', fullName: 'employeeSix', designation: 'IOT Developer', department: 'IT/Hardware', mobile: '9608889843', status: 0 },
    ];
    employeesCount: any = 0;
    editEmpItem: any = {};

    constructor(
        public router: Router,
        public authAdminService: AuthAdminService,
        public employeeApiService: EmployeeApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
        this.getEmployeesList();
    }

    onSearchEmployee() {
        if (this.filterQuery) {
            this.getEmployeesList();
        }
    }

    openFilters() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            document.getElementById("mySidenav").style.width = "260px";
        } else {
            document.getElementById("mySidenav").style.width = "0";
        }
    }

    closeFilters() {
        document.getElementById("mySidenav").style.width = "0";
    }

    applyFilter() {
        if (this.filterStatus !== 'all') {
            this.filterStatus = Number(this.filterStatus);
            this.getEmployeesList();
        }
    }

    resetFilter() {
        if (this.filterStatus !== 'all') {
            this.filterStatus = 'all';
            this.getEmployeesList();
        }
    }

    resetSearchFilters() {
        if (this.filterQuery) {
            this.filterQuery = '';
            this.limit = 5;
            this.page = 1;
            this.count = 0;
            this.totalPages = 0;
            this.pager = [];
            this.getEmployeesList();
        }
    }

    getEmployeesList() {
        this.spinner = true;
        const empsPayload = {
            limit: Number(this.limit),
            page: Number(this.page),
            query: this.filterQuery,
            status: this.filterStatus
        }
        console.log('Post payload to get employees list isss', empsPayload);

        this.employeeApiService.getEmployeesData(empsPayload).subscribe(async (response: any) => {
            console.log('Get employees list response isss', response);
            if (response && response.success) {
                this.employeesList = response.data.list;
                this.employeesCount = response.data.count;
                this.count = response.data.count;
                this.createPager();
            } else {
                this.toastr.errorToastr(response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.spinner = false;
        });
    }

    createPager() {
        let pageCount = (Number(this.count) % Number(this.limit) == 0) ? (Number(this.count) / Number(this.limit)) : (Number(this.count) / Number(this.limit)) + 1;
        console.log('pageCount isss:', pageCount);

        pageCount = Math.floor(pageCount);

        this.pager = [];

        for (let i = 1; i <= Number(pageCount); i += 1) {
            this.pager.push(i);
        }

        console.log('pager isss', this.pager);
    }

    setPage(page?: any) {
        this.page = Number(page);
        this.getEmployeesList();
    }

    setClass(item: any) {
        const newObj = {
            'active': Number(item) == this.page,
            'disabled': Number(item) == this.page || (Number(item) == this.page && this.page == 1) || (Number(item) == this.page && this.page == this.pager.length),
            'ml-5': Number(item) == 1
        }
        return newObj;
    }

    onSelectEmployee(item?: any) {
        console.log('Selected item isss', item);
        this.editEmpItem = item;
        this.submitReq = 0;
    }

    updateEmployee(item?: any) {
        this.router.navigate(['/add-employee'], { queryParams: { userId: Number(item['userId']) }});
    }

    deactivateRestoreEmployee() {
        const empsPayload = {
            userId: this.editEmpItem['userId'],
            status: this.editEmpItem['status'] == 1 ? 0 : 1
        }
        console.log('Post payload to update employee status isss', empsPayload);

        this.employeeApiService.updateEmployeeStatus(empsPayload).subscribe(async (response: any) => {
            console.log('Get employee status response isss', response);
            if (response && response.success) {
                this.toastr.successToastr(response.message);
                if (this.editEmpItem['status'] == 1) {
                    $('#deleteReqModal').modal('hide');
                } else {
                    $('#restoreReqModal').modal('hide');
                }
                this.editEmpItem = {};
                this.getEmployeesList();
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

    generateNewPassword() {
        this.submitReq = 1;
        const empPayload = {
            user_id: this.editEmpItem['userId'],
            userName: this.editEmpItem['userName'],
            email: this.editEmpItem['email']
        }
        console.log('Post payload to update employee password isss', empPayload);

        this.employeeApiService.generatePasswordToEmployee(empPayload).subscribe(async (response: any) => {
            console.log('Get update employee password response isss', response);
            if (response && response.success) {
                this.submitReq = 2;
                this.editEmpItem = {};
                this.getEmployeesList();
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
