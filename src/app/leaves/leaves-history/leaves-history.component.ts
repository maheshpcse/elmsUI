import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { EmployeeApisService } from 'src/app/api-services/employee-apis.service';
import { LeavemanagementApisService } from 'src/app/api-services/leavemanagement-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-leaves-history',
    templateUrl: './leaves-history.component.html',
    styleUrls: ['./leaves-history.component.css']
})
export class LeavesHistoryComponent implements OnInit {

    public empId: any = sessionStorage.getItem('employeeId');
    spinner: any = false;
    showFilter: any = false;
    viewData: any = false;
    submitReq: any = 0;
    limit: any = 5;
    page: any = 1;
    filterQuery: any = '';
    filterStatus: any = 'all';
    filterLeavetype: any = 'all';
    count: any = 0;
    totalPages: any = 0;
    pager: any = [];
    empLeavesList: any = [
        // { lh_Id: 1, leaveTypeName: 'Casual Leave', leaveStartDate: '2022-01-02', leaveEndDate: '2022-01-04', reason: 'Going to home', leaveAppliedDate: '2022-01-01', remarks: 'permission granted', status: 1 },
        // { lh_Id: 2, leaveTypeName: 'Casual Leave', leaveStartDate: '2022-01-11', leaveEndDate: '2022-01-13', reason: 'Sankranthi festival', leaveAppliedDate: '2022-01-10', remarks: 'permission granted', status: 1 },
        // { lh_Id: 3, leaveTypeName: 'Sick Leave', leaveStartDate: '2021-12-10', leaveEndDate: '2022-01-11', reason: 'Health checkup', leaveAppliedDate: '2021-12-09', remarks: 'permission not granted', status: 0 },
        // { lh_Id: 4, leaveTypeName: 'Comp off', leaveStartDate: '2021-12-24', leaveEndDate: '2021-12-24', reason: 'Christmas celebrations', leaveAppliedDate: '2021-12-23', remarks: 'permission not granted', status: 0 },
        // { lh_Id: 5, leaveTypeName: 'Medical Leave', leaveStartDate: '2021-11-02', leaveEndDate: '2021-11-03', reason: 'Eye care appointment', leaveAppliedDate: '2021-11-01', remarks: 'permission granted', status: 1 },
    ];
    empLeavesCount: any = 0;
    editLeaveItem: any = {};
    leavetypesList: any = [];

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authUserService: AuthUserService,
        public leaveManagementApiService: LeavemanagementApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
        this.getEmployeeAllLeaveHistory();
        this.getAllLeavetypes();
    }

    openViewDetails() {
        this.viewData = !this.viewData;
        if (this.viewData) {
            document.getElementById("mySidenav-view").style.width = "450px";
        } else {
            document.getElementById("mySidenav-view").style.width = "0";
        }
    }

    closeViewDetails() {
        document.getElementById("mySidenav-view").style.width = "0";
    }

    onSearchLeave() {
        if (this.filterQuery) {
            this.getEmployeeAllLeaveHistory();
        }
    }

    openFilters() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            document.getElementById("mySidenav").style.width = "260px";
            this.getAllLeavetypes();
            this.filterLeavetype = this.filterLeavetype || null;
        } else {
            document.getElementById("mySidenav").style.width = "0";
        }
    }

    closeFilters() {
        document.getElementById("mySidenav").style.width = "0";
    }

    applyFilter() {
        if (this.filterStatus !== 'all' || this.filterLeavetype !== 'all') {
            if (this.filterStatus !== 'all') {
                this.filterStatus = Number(this.filterStatus);
            }
            if (this.filterLeavetype !== 'all') {
                this.filterLeavetype = this.filterLeavetype;
            }
            this.getEmployeeAllLeaveHistory();
        }
    }

    resetFilter() {
        if (this.filterStatus !== 'all' || this.filterLeavetype !== 'all') {
            if (this.filterStatus !== 'all') {
                this.filterStatus = 'all';
            }
            if (this.filterLeavetype !== 'all') {
                this.filterLeavetype = 'all';
            }
            this.getEmployeeAllLeaveHistory();
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
            this.getEmployeeAllLeaveHistory();
        }
    }

    getEmployeeAllLeaveHistory() {
        this.spinner = true;
        const empLeavesPayload = {
            emp_id: this.empId,
            limit: Number(this.limit),
            page: Number(this.page),
            query: this.filterQuery,
            status: this.filterStatus,
            leavetype: this.filterLeavetype
        }
        console.log('Post payload to get employee all leaves list isss', empLeavesPayload);

        this.leaveManagementApiService.getEmployeeAllLeaveHistoryData(empLeavesPayload).subscribe(async (response: any) => {
            console.log('Get employee all leaves list response isss', response);
            if (response && response.success) {
                this.empLeavesList = response.data.list;
                this.empLeavesCount = response.data.count;
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

    getAllLeavetypes() {
        const leavetypesPayload = {
            emp_id: this.empId,
            type: ''
        }
        console.log('Post payload to get all leavetypes data isss', leavetypesPayload);

        this.leaveManagementApiService.getEmployeeLeavetypesData(leavetypesPayload).subscribe(async (response: any) => {
            console.log('Get all leavetypes list response isss', response);
            if (response && response.success) {
                this.leavetypesList = response.data;
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
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
        this.getEmployeeAllLeaveHistory();
    }

    setClass(item: any) {
        const newObj = {
            'active': Number(item) == this.page,
            'disabled': Number(item) == this.page || (Number(item) == this.page && this.page == 1) || (Number(item) == this.page && this.page == this.pager.length),
            'ml-5': Number(item) == 1
        }
        return newObj;
    }

    onSelectLeave(item?: any) {
        console.log('Selected item isss', item);
        this.editLeaveItem = item;
        this.submitReq = 0;
    }

    updateLeave(item?: any) {
        this.router.navigate(['/apply-leave'], { queryParams: { lh_Id: Number(item['lh_Id']) } });
    }

    cancelLeaveRequestToEmployee() {
        const startDate = this.editLeaveItem['leaveStartDate'];
        const currentDate = moment().format('YYYY-MM-DD');
        if (currentDate >= startDate) {
            return this.toastr.errorToastr('Leave start date should be greater than Current date');
        }

        const empsPayload = {
            lh_Id: this.editLeaveItem['lh_Id'],
            status: 3
        }
        console.log('Post payload to cancel leave request to employee isss', empsPayload);

        this.leaveManagementApiService.deleteLeaveRequestToEmployee(empsPayload).subscribe(async (response: any) => {
            console.log('Get cancel leave request to employee response isss', response);
            if (response && response.success) {
                this.toastr.successToastr(response.message);
                $('#cancelReqModal').modal('hide');
                this.editLeaveItem = {};
                this.getEmployeeAllLeaveHistory();
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

}
