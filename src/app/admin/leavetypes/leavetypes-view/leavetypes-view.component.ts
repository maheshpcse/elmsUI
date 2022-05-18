import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-leavetypes-view',
    templateUrl: './leavetypes-view.component.html',
    styleUrls: ['./leavetypes-view.component.css']
})
export class LeavetypesViewComponent implements OnInit {

    public pageId: any = null;
    empData: any = {
        userId: 1,
        employeeId: 'EMP001',
        employeeName: 'employeeOne',
        profileImage: null,
        email: 'maheshpm1599@gmail.com',
        mobile: '8886197968',
        status: 1,
        leaveTypeId: 1,
        leaveTypeName: 'Casual Leave',
        leaveStartDate: '2021-02-03',
        leaveEndDate: '2021-02-05',
        leaveAppliedDate: '2021-01-10',
        leaveReason: 'Vacation to Araku',
        remarks: 'permission granted',
        leaveStatus: 2,
        approvedDate: '2021-02-02',
        adminStatus: 2
    };

    transformData: any = null;

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((id?: any) => {
            console.log('Get page id isss', id);
            this.pageId = Number(id);
        });
    }

    goBackTo() {
        this.router.navigate(['/manage-leavetype']);
    }

}
