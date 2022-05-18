import { Component, OnInit } from '@angular/core';
import { EmployeeApisService } from 'src/app/api-services/employee-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'app-apply-leaves',
    templateUrl: './apply-leaves.component.html',
    styleUrls: ['./apply-leaves.component.css']
})
export class ApplyLeavesComponent implements OnInit {

    leaveTypeName: any = null;
    leaveTypeId: any = null;
    leaveStartDate: any = null;
    leaveEndDate: any = null;
    leaveReason: any = null;

    constructor(
        public employeeApiService: EmployeeApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
    }

    applyLeave() {
        const leaveRequestPayload = {
            leave_type: this.leaveTypeId,
            leave_start_date: this.leaveStartDate,
            leave_end_date: this.leaveEndDate,
            reason: this.leaveReason
        };
        console.log('Post payload to apply leave request data isss', leaveRequestPayload);

        this.employeeApiService.applyLeaveRequest(leaveRequestPayload).subscribe(async (response: any) => {
            console.log('Get apply leave request data response isss', response);
            if (response.success) {
                this.toastr.successToastr(response.message);
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

}
