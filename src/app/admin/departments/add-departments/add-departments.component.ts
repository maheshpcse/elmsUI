import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DepartmentApisService } from 'src/app/api-services/department-apis.service';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-add-departments',
    templateUrl: './add-departments.component.html',
    styleUrls: ['./add-departments.component.css']
})
export class AddDepartmentsComponent implements OnInit {

    deptName: any = null;
    deptShortName: any = null;
    deptShortCode: any = null;
    @ViewChild('departmentForm', { static: false }) departmentFormRef: NgForm;
    submitReq: any = 0;
    pageId: any = null;
    action: any = 'Add';

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public departmentApiService: DepartmentApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['deptId']) : null;
        });
        if (this.pageId) {
            this.action = 'Update';
            this.getDepartmentData();
        }
    }

    goBackTo() {
        this.router.navigate(['/manage-department']);
    }

    getDepartmentData() {
        this.departmentApiService.getDepartmentDataById(Number(this.pageId)).subscribe(async (response: any) => {
            console.log('Get department data response isss', response);
            if (response && response.success) {
                if (response.data && Object.keys(response.data).length > 0) {
                    this.deptName = response.data['departmentName'];
                    this.deptShortName = response.data['departmentShortName'];
                    this.deptShortCode = response.data['departmentShortCode'];
                }
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

    createData() {
        const tempDept = this.deptName.split('');

        let tempShortName: any = [];

        if (tempDept && tempDept.length && Number(tempDept[0].charCodeAt(0)) !== 32) {
            tempShortName.push(tempDept[0].toUpperCase());
        }
        
        let spaceData: any = {};
        let index: any = 0;

        for (const item of tempDept) {
            if (Number(item.charCodeAt(0)) === 32) {
                spaceData[index + 1] = index + 1;
            }
            index = index + 1;
        }

        for (const [key, value] of Object.entries(spaceData)) {
            if (tempDept[key]) {
                tempShortName.push(tempDept[key].toUpperCase());
            }
        }
        console.log('tempShortName isss', tempShortName);

        if (tempShortName && tempShortName.length > 0) {
            this.deptShortName = (tempShortName.join("")).toString();
            this.deptShortCode = (`${tempShortName.join("")}_DEPT`).toString();
        } else {
            this.deptShortName = null;
            this.deptShortCode = null;
        }
    }

    openSubmitModal() {
        if (this.departmentFormRef.invalid) {
            return this.toastr.errorToastr('Please fill the required fields');
        }
        $('#submitReqModal').modal('show');
        this.submitReq = 0;
    }

    saveDepartmentData() {
        // this.submitReq = 1;
        // setTimeout(() => {
        //     this.submitReq = 2;
        // }, 2000);
        this.submitReq = 1;

        const departmentPayload = {
            action: this.action == 'Add' ? 'I' : 'U',
            data: {
                deptId: Number(this.pageId) || null,
                departmentName: this.deptName,
                departmentShortName: this.deptShortName,
                departmentShortCode: this.deptShortCode,
                status: 1
            }
        }
        console.log('Post payload to add/update department data isss', departmentPayload);

        this.departmentApiService.addUpdateDepartmentData(departmentPayload).subscribe(async (response: any) => {
            console.log('Get add/update department data response isss', response);
            if (response && response.success) {
                this.submitReq = 2;
                this.departmentFormRef.reset();
                if (this.pageId) {
                    this.getDepartmentData();
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
