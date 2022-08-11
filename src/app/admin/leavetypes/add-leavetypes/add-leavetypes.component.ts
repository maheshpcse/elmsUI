import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { LeavetypeApisService } from 'src/app/api-services/leavetype-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-add-leavetypes',
    templateUrl: './add-leavetypes.component.html',
    styleUrls: ['./add-leavetypes.component.css']
})
export class AddLeavetypesComponent implements OnInit {

    leaveTypeName: any = null;
    leaveTypeShortName: any = null;
    leaveTypeShortCode: any = null;
    leaveTypeDescription: any = null;
    @ViewChild('leavetypeForm', { static: false }) leavetypeFormRef: NgForm;
    submitReq: any = 0;
    pageId: any = null;
    action: any = 'Add';

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public leavetypeApiService: LeavetypeApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['lt_Id']) : null;
        });
        if (this.pageId) {
            this.action = 'Update';
            this.getLeavetypeData();
        }
    }

    goBackTo() {
        this.router.navigate(['/manage-leavetype']);
    }

    getLeavetypeData() {
        this.leavetypeApiService.geLeavetypeDataById(Number(this.pageId)).subscribe(async (response: any) => {
            console.log('Get leavetype data response isss', response);
            if (response && response.success) {
                if (response.data && Object.keys(response.data).length > 0) {
                    this.leaveTypeName = response.data['leaveTypeName'];
                    this.leaveTypeShortName = response.data['leaveShortName'];
                    this.leaveTypeShortCode = response.data['leaveShortCode'];
                    this.leaveTypeDescription = response.data['description'];
                }
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

    createData() {
        const tempLeaveType = this.leaveTypeName.split('')

        let tempShortName: any = []
        if (tempLeaveType && tempLeaveType.length && Number(tempLeaveType[0].charCodeAt(0)) !== 32) {
            tempShortName.push(tempLeaveType[0].toUpperCase());
        }
        let spaceData: any = {};
        let index: any = 0;

        for (const item of tempLeaveType) {
            if (Number(item.charCodeAt(0)) === 32) {
                spaceData[index + 1] = index + 1;
            }
            index = index + 1;
        }

        for (const [key, value] of Object.entries(spaceData)) {
            if (tempLeaveType[key]) {
                tempShortName.push(tempLeaveType[key].toUpperCase());
            }
        }
        console.log('tempShortName isss', tempShortName);

        if (tempShortName && tempShortName.length > 0) {
            this.leaveTypeShortName = (tempShortName.join("")).toString();
            this.leaveTypeShortCode = (`${tempShortName.join("")}_LEAVETYPE`).toString();
        } else {
            this.leaveTypeShortName = null;
            this.leaveTypeShortCode = null;
        }
    }

    openSubmitModal() {
        if (this.leavetypeFormRef.invalid) {
            return this.toastr.errorToastr('Please fill the required fields');
        }
        $('#submitReqModal').modal('show');
        this.submitReq = 0;
    }

    saveLeavetypeData() {
        // this.submitReq = 1;
        // setTimeout(() => {
        //     this.submitReq = 2;
        // }, 2000);
        this.submitReq = 1;

        const departmentPayload = {
            action: this.action == 'Add' ? 'I' : 'U',
            data: {
                lt_Id: Number(this.pageId) || null,
                leaveTypeName: this.leaveTypeName,
                leaveShortName: this.leaveTypeShortName,
                leaveShortCode: this.leaveTypeShortCode,
                description: this.leaveTypeDescription,
                status: 1
            }
        }
        console.log('Post payload to add/update leavetype data isss', departmentPayload);

        this.leavetypeApiService.addUpdateLeavetypeData(departmentPayload).subscribe(async (response: any) => {
            console.log('Get add/update leavetype data response isss', response);
            if (response && response.success) {
                this.submitReq = 2;
                this.leavetypeFormRef.reset();
                if (this.pageId) {
                    this.getLeavetypeData();
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
