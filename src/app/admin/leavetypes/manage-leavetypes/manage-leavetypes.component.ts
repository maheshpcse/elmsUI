import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { LeavetypeApisService } from 'src/app/api-services/leavetype-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
declare var $: any;

@Component({
    selector: 'app-manage-leavetypes',
    templateUrl: './manage-leavetypes.component.html',
    styleUrls: ['./manage-leavetypes.component.css']
})
export class ManageLeavetypesComponent implements OnInit {

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
    leaveTypesList: any = [
        // { leaveTypeId: 1, name: 'Earned leave', shortName: 'earned_leave', shortCode: 'EL', status: 1, created_at: '2021-01-02' },
        // { leaveTypeId: 2, name: 'Sick leave', shortName: 'sick_leave', shortCode: 'SL', status: 0, created_at: '2021-01-02' },
        // { leaveTypeId: 3, name: 'Casual leave', shortName: 'casual_leave', shortCode: 'CL', status: 1, created_at: '2021-02-03' },
        // { leaveTypeId: 4, name: 'Leave without pay', shortName: 'leave_without_pay', shortCode: 'LWP', status: 1, created_at: '2021-02-04' },
        // { leaveTypeId: 5, name: 'Maternity leave', shortName: 'maternity_leave', shortCode: 'ML', status: 0, created_at: '2021-03-04' },
        // { leaveTypeId: 6, name: 'Paternity leave', shortName: 'paternity_leave', shortCode: 'PL', status: 1, created_at: '2021-03-05' }
    ];
    leaveTypesCount: any = 0;
    editLeaveItem: any = {};

    constructor(
        public router: Router,
        public authAdminService: AuthAdminService,
        public leavetypeApiService: LeavetypeApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
        this.getLeavetypesList();
    }

    onSearchLeavetype() {
        if (this.filterQuery) {
            this.getLeavetypesList();
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
            this.getLeavetypesList();
        }
    }

    resetFilter() {
        if (this.filterStatus !== 'all') {
            this.filterStatus = 'all';
            this.getLeavetypesList();
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
            this.getLeavetypesList();
        }
    }

    getLeavetypesList() {
        this.spinner = true;
        const deptsPayload = {
            limit: Number(this.limit),
            page: Number(this.page),
            query: this.filterQuery,
            status: this.filterStatus
        }
        console.log('Post payload to get leavetypes list isss', deptsPayload);

        this.leavetypeApiService.getLeavetypesData(deptsPayload).subscribe(async (response: any) => {
            console.log('Get leavetypes list response isss', response);
            if (response && response.success) {
                this.leaveTypesList = response.data.list;
                this.leaveTypesCount = response.data.count;
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
        this.getLeavetypesList();
    }

    setClass(item: any) {
        const newObj = {
            'active': Number(item) == this.page,
            'disabled': Number(item) == this.page || (Number(item) == this.page && this.page == 1) || (Number(item) == this.page && this.page == this.pager.length),
            'ml-5': Number(item) == 1
        }
        return newObj;
    }

    onSelectLeavetype(item?: any) {
        console.log('Selected item isss', item);
        this.editLeaveItem = item;
        this.submitReq = 0;
    }

    updateLeavetype(item?: any) {
        this.router.navigate(['/add-leavetype'], { queryParams: { lt_Id: Number(item['lt_Id']) }});
    }

    deactivateRestoreLeavetype() {
        const deptsPayload = {
            lt_Id: this.editLeaveItem['lt_Id'],
            status: this.editLeaveItem['status'] == 1 ? 0 : 1
        }
        console.log('Post payload to update leavetype status isss', deptsPayload);

        this.leavetypeApiService.updateLeavetypeStatus(deptsPayload).subscribe(async (response: any) => {
            console.log('Get leavetype status response isss', response);
            if (response && response.success) {
                this.toastr.successToastr(response.message);
                if (this.editLeaveItem['status'] == 1) {
                    $('#deleteReqModal').modal('hide');
                } else {
                    $('#restoreReqModal').modal('hide');
                }
                this.editLeaveItem = {};
                this.getLeavetypesList();
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

}
