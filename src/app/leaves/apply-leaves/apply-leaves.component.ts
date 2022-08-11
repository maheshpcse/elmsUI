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
    selector: 'app-apply-leaves',
    templateUrl: './apply-leaves.component.html',
    styleUrls: ['./apply-leaves.component.css']
})
export class ApplyLeavesComponent implements OnInit {

    public empId: any = sessionStorage.getItem('employeeId');
    leaveTypesList: any = [];
    leaveBalance: any = 0;
    leaveTypeId: any = null;
    leaveTypeName: any = null;
    leaveShortCode: any = null;
    leaveStartDate: any = null;
    leaveEndDate: any = null;
    leaveReason: any = null;
    @ViewChild('applyLeaveForm', { static: false }) applyLeaveFormRef: NgForm;
    @ViewChild('startdatename', { static: false }) startdatenameRef: NgModel;
    @ViewChild('enddatename', { static: false }) enddatenameRef: NgModel;
    minimumStartDate: any = new Date();
    minimumEndDate: any = new Date();
    submitReq: any = 0;
    pageId: any = null;
    action: any = 'Save';
    invalidDates: any = [];
    tempInvalidDates: any = [];
    empLeaveAppliedItem: any = {};

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authUserService: AuthUserService,
        public employeeApiService: EmployeeApisService,
        public leaveManagementApiService: LeavemanagementApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.getEmployeeLeavetypesList();
        this.route.queryParams.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['lh_Id']) : null;
        });

        $(function(){
            let dtToday: any = new Date();
            
            let month: any = dtToday.getMonth() + 1;
            let day: any = dtToday.getDate();
            let year: any = dtToday.getFullYear();
            if(month < 10)
                month = '0' + month.toString();
            if(day < 10)
                day = '0' + day.toString();
            
            let maxDate: any = year + '-' + month + '-' + day;
            console.log('maxDate isss', maxDate);
            $('#startdateId').attr('min', maxDate);
        });
    }

    // currently not using
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

    getEmployeeLeavetypesList() {
        const leavetypesPayload = {
            emp_id: this.empId,
            type: 'apply-leave'
        }
        console.log('Post payload to get employee leavetypes data isss', leavetypesPayload);

        this.leaveManagementApiService.getEmployeeLeavetypesData(leavetypesPayload).subscribe(async (response: any) => {
            console.log('Get employee leavetypes data response isss', response);
            if (response && response.success) {
                this.leaveTypesList = response && response.data ? response.data : [];
                if (this.pageId) {
                    this.action = 'Update';
                    this.getEmpAppliedLeaveData();
                }
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

    getEmpAppliedLeaveData() {
        this.leaveManagementApiService.getEmployeeLeaveHistoryDataById(Number(this.pageId)).subscribe(async (response: any) => {
            console.log('Get employee leave applied data response isss', response);
            if (response && response.success) {
                if (response.data && Object.keys(response.data).length > 0) {
                    this.empLeaveAppliedItem = response.data;
                    const {
                        leaveShortCode
                    } = response.data;
                    const filterItem = _.filter(this.leaveTypesList, (ele: any) => {
                        return ele.leaveShortCode === leaveShortCode;
                    });
                    console.log('filterItem isss', filterItem);
                    if (filterItem && filterItem.length > 0) {
                        this.leaveTypeId = filterItem[0]['lt_Id'];
                        this.onSelectLeavetype(filterItem[0]['lt_Id']);
                    }
                }
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

    onSelectLeavetype(id?: any) {
        console.log('Selected id isss', id);
        if (this.startdatenameRef) {
            this.startdatenameRef.reset();
        }
        if (this.enddatenameRef) {
            this.enddatenameRef.reset();
        }
        this.leaveStartDate = null;
        this.leaveEndDate = null;
        this.leaveBalance = 0;
        this.invalidDates = [];
        this.tempInvalidDates = [];
        this.leaveTypeName = null;
        this.leaveShortCode = null;
        this.minimumStartDate = new Date();
        this.minimumEndDate = new Date();
        const filterItem = _.filter(this.leaveTypesList, (ele: any) => {
            return ele.lt_Id === Number(id);
        });
        console.log('Filtered item isss', filterItem);
        this.leaveTypeName = filterItem && filterItem.length > 0 ? filterItem[0]['leaveTypeName'] : null;
        this.leaveShortCode = filterItem && filterItem.length > 0 ? filterItem[0]['leaveShortCode'] : null;
        this.leaveBalance = filterItem && filterItem.length > 0 ? filterItem[0]['leaveBalance'] : 0;
        if (filterItem && filterItem.length > 0) {
            for (const item of filterItem[0]['appliedLeaves']) {
                this.invalidDates.push(new Date(item));
                this.tempInvalidDates.push(item);
            }
        }
        console.log('invalidDates isss', this.invalidDates);
        console.log('tempInvalidDates isss', this.tempInvalidDates);

        if (this.pageId) {
            const {
                leaveStartDate,
                leaveEndDate,
                reason
            } = this.empLeaveAppliedItem;
            this.leaveStartDate = new Date(leaveStartDate);
            this.leaveEndDate = new Date(leaveEndDate);
            this.leaveReason = reason;
        }
    }

    onSelectStatDate(event?: any) {
        console.log('Selected event isss', event);
        this.minimumEndDate = new Date(moment(event).format('YYYY-MM-DD'));
    }

    setDisable() {
        if (this.pageId) {
            return true;
        } else {
            return false;
        }
    }

    openSubmitModal() {
        if (this.applyLeaveFormRef.invalid) {
            return this.toastr.errorToastr('Please fill the required fields');
        }
        $('#submitReqModal').modal('show');
        this.submitReq = 0;
    }

    applyLeaveToEmployee() {
        // this.submitReq = 1;
        // setTimeout(() => {
        //     this.submitReq = 2;
        // }, 2000);
        this.submitReq = 1;

        const applyLeavePayload = {
            action: this.action == 'Save' ? 'I' : 'U',
            data: {
                lh_Id: Number(this.pageId) || null,
                emp_id: this.empId,
                leaveShortCode: this.leaveShortCode,
                leaveStartDate: moment(this.leaveStartDate).format('YYYY-MM-DD'),
                leaveEndDate: moment(this.leaveEndDate).format('YYYY-MM-DD'),
                leaveAppliedDate: moment().format('YYYY-MM-DD'),
                reason: this.leaveReason,
                effectiveMonth: moment().format('YYYY-MM'),
                remarks: null,
                status: 2
            }
        }
        console.log('Post payload to apply leave to employee data isss', applyLeavePayload);

        this.leaveManagementApiService.addUpdateEmployeeAppliedLeaveData(applyLeavePayload).subscribe(async (response: any) => {
            console.log('Get add/update employee data response isss', response);
            if (response && response.success) {
                this.submitReq = 2;
                this.resetForm();
            } else {
                this.toastr.errorToastr(response.message);
                this.submitReq = 3;
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.submitReq = 3;
        });
    }

    resetForm() {
        if (this.applyLeaveFormRef) {
            this.applyLeaveFormRef.reset();
        }
        this.leaveTypeId = null;
        this.leaveTypeName = null;
        this.leaveShortCode = null;
        this.leaveStartDate = null;
        this.leaveEndDate = null;
        this.leaveReason = null;
        this.leaveBalance = 0;
        this.leaveTypesList = [];
        this.getEmployeeLeavetypesList();
    }

    setColor(date?: any) {
        const setDate = `${date.year}-${date.month}-${date.day}`
        if (this.tempInvalidDates.includes(setDate)) {
            return true;
        } else {
            return false;
        }
    }

}
