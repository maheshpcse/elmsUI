import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { DepartmentApisService } from 'src/app/api-services/department-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
declare var $: any;

@Component({
    selector: 'app-manage-departments',
    templateUrl: './manage-departments.component.html',
    styleUrls: ['./manage-departments.component.css']
})
export class ManageDepartmentsComponent implements OnInit {

    spinner: any = false;
    showFilter: any = false;
    submitReq: any = 0;
    limit: any = 5;
    page: any = 1;
    filterQuery: any = '';
    filterStatus: any = 'all';
    count: any = 0;
    totalPages: any = 0;
    pager: any = [];
    departmentsList: any = [
        // { deptId: 1, name: 'Marketing', shortName: 'marketing_dept', shortCode: 'MAD', status: 1, created_at: '2021-01-02' },
        // { deptId: 2, name: 'HR', shortName: 'hr_dept', shortCode: 'HRD', status: 0, created_at: '2021-01-02' },
        // { deptId: 3, name: 'Finance', shortName: 'finance_deft', shortCode: 'FID', status: 1, created_at: '2021-02-03' },
        // { deptId: 4, name: 'IT/Software', shortName: 'it_software_dept', shortCode: 'ITS', status: 1, created_at: '2021-02-04' },
        // { deptId: 5, name: 'IT/Hardware', shortName: 'it_hardware_dept', shortCode: 'ITH', status: 0, created_at: '2021-03-04' },
        // { deptId: 6, name: 'Business', shortName: 'business_dept', shortCode: 'BUD', status: 1, created_at: '2021-03-05' },
        // { deptId: 7, name: 'Marketing', shortName: 'marketing_dept', shortCode: 'MAD', status: 1, created_at: '2021-01-02' },
        // { deptId: 8, name: 'HR', shortName: 'hr_dept', shortCode: 'HRD', status: 0, created_at: '2021-01-02' },
        // { deptId: 9, name: 'Finance', shortName: 'finance_deft', shortCode: 'FID', status: 1, created_at: '2021-02-03' },
        // { deptId: 10, name: 'IT/Software', shortName: 'it_software_dept', shortCode: 'ITS', status: 1, created_at: '2021-02-04' },
        // { deptId: 11, name: 'IT/Hardware', shortName: 'it_hardware_dept', shortCode: 'ITH', status: 0, created_at: '2021-03-04' },
        // { deptId: 12, name: 'Business', shortName: 'business_dept', shortCode: 'BUD', status: 1, created_at: '2021-03-05' },
        // { deptId: 13, name: 'Marketing', shortName: 'marketing_dept', shortCode: 'MAD', status: 1, created_at: '2021-01-02' },
        // { deptId: 14, name: 'HR', shortName: 'hr_dept', shortCode: 'HRD', status: 0, created_at: '2021-01-02' },
        // { deptId: 15, name: 'Finance', shortName: 'finance_deft', shortCode: 'FID', status: 1, created_at: '2021-02-03' },
        // { deptId: 16, name: 'IT/Software', shortName: 'it_software_dept', shortCode: 'ITS', status: 1, created_at: '2021-02-04' },
        // { deptId: 17, name: 'IT/Hardware', shortName: 'it_hardware_dept', shortCode: 'ITH', status: 0, created_at: '2021-03-04' },
        // { deptId: 18, name: 'Business', shortName: 'business_dept', shortCode: 'BUD', status: 1, created_at: '2021-03-05' }
    ];
    departmentsCount: any = 0;
    tempData: any = [
        { deptId: 1, name: 'Marketing', shortName: 'marketing_dept', shortCode: 'MAD', status: 1, created_at: '2021-01-02' },
        { deptId: 2, name: 'HR', shortName: 'hr_dept', shortCode: 'HRD', status: 0, created_at: '2021-01-02' },
        { deptId: 3, name: 'Finance', shortName: 'finance_deft', shortCode: 'FID', status: 1, created_at: '2021-02-03' },
        { deptId: 4, name: 'IT/Software', shortName: 'it_software_dept', shortCode: 'ITS', status: 1, created_at: '2021-02-04' },
        { deptId: 5, name: 'IT/Hardware', shortName: 'it_hardware_dept', shortCode: 'ITH', status: 0, created_at: '2021-03-04' },
        { deptId: 6, name: 'Business', shortName: 'business_dept', shortCode: 'BUD', status: 1, created_at: '2021-03-05' },
        { deptId: 7, name: 'Marketing', shortName: 'marketing_dept', shortCode: 'MAD', status: 1, created_at: '2021-01-02' },
        { deptId: 8, name: 'HR', shortName: 'hr_dept', shortCode: 'HRD', status: 0, created_at: '2021-01-02' },
        { deptId: 9, name: 'Finance', shortName: 'finance_deft', shortCode: 'FID', status: 1, created_at: '2021-02-03' },
        { deptId: 10, name: 'IT/Software', shortName: 'it_software_dept', shortCode: 'ITS', status: 1, created_at: '2021-02-04' },
        { deptId: 11, name: 'IT/Hardware', shortName: 'it_hardware_dept', shortCode: 'ITH', status: 0, created_at: '2021-03-04' },
        { deptId: 12, name: 'Business', shortName: 'business_dept', shortCode: 'BUD', status: 1, created_at: '2021-03-05' },
        { deptId: 13, name: 'Marketing', shortName: 'marketing_dept', shortCode: 'MAD', status: 1, created_at: '2021-01-02' },
        { deptId: 14, name: 'HR', shortName: 'hr_dept', shortCode: 'HRD', status: 0, created_at: '2021-01-02' },
        { deptId: 15, name: 'Finance', shortName: 'finance_deft', shortCode: 'FID', status: 1, created_at: '2021-02-03' },
        { deptId: 16, name: 'IT/Software', shortName: 'it_software_dept', shortCode: 'ITS', status: 1, created_at: '2021-02-04' },
        { deptId: 17, name: 'IT/Hardware', shortName: 'it_hardware_dept', shortCode: 'ITH', status: 0, created_at: '2021-03-04' },
        { deptId: 18, name: 'Business', shortName: 'business_dept', shortCode: 'BUD', status: 1, created_at: '2021-03-05' }
    ];
    editDeptItem: any = {};

    constructor(
        public router: Router,
        public authAdminService: AuthAdminService,
        public departmentApiService: DepartmentApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
        this.getDepartmentsList();
    }

    onSearchDepartment() {
        if (this.filterQuery) {
            this.getDepartmentsList();
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
            this.getDepartmentsList();
        }
    }

    resetFilter() {
        if (this.filterStatus !== 'all') {
            this.filterStatus = 'all';
            this.getDepartmentsList();
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
            this.getDepartmentsList();
        }
    }

    getDepartmentsList() {
        this.spinner = true;
        const deptsPayload = {
            limit: Number(this.limit),
            page: Number(this.page),
            query: this.filterQuery,
            status: this.filterStatus
        }
        console.log('Post payload to get departments list isss', deptsPayload);

        this.departmentApiService.getDepartmentsData(deptsPayload).subscribe(async (response: any) => {
            console.log('Get departments list response isss', response);
            if (response && response.success) {
                this.departmentsList = response.data.list;
                this.departmentsCount = response.data.count;
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
        this.getDepartmentsList();
    }

    setClass(item: any) {
        const newObj = {
            'active': Number(item) == this.page,
            'disabled': Number(item) == this.page || (Number(item) == this.page && this.page == 1) || (Number(item) == this.page && this.page == this.pager.length),
            'ml-5': Number(item) == 1
        }
        return newObj;
    }

    onSelectDepartment(item?: any) {
        console.log('Selected item isss', item);
        this.editDeptItem = item;
        this.submitReq = 0;
    }

    updateDepartment(item?: any) {
        this.router.navigate(['/add-department'], { queryParams: { deptId: Number(item['deptId']) }});
    }

    deactivateRestoreDepartment() {
        const deptsPayload = {
            deptId: this.editDeptItem['deptId'],
            status: this.editDeptItem['status'] == 1 ? 0 : 1
        }
        console.log('Post payload to update department status isss', deptsPayload);

        this.departmentApiService.updateDepartmentStatus(deptsPayload).subscribe(async (response: any) => {
            console.log('Get department status response isss', response);
            if (response && response.success) {
                this.toastr.successToastr(response.message);
                if (this.editDeptItem['status'] == 1) {
                    $('#deleteReqModal').modal('hide');
                } else {
                    $('#restoreReqModal').modal('hide');
                }
                this.editDeptItem = {};
                this.getDepartmentsList();
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

}
