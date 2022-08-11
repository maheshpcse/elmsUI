import { AuthAdminService } from './../../../api-services/auth-admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeavetypeApisService } from 'src/app/api-services/leavetype-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';

@Component({
    selector: 'app-leavetypes-view',
    templateUrl: './leavetypes-view.component.html',
    styleUrls: ['./leavetypes-view.component.css']
})
export class LeavetypesViewComponent implements OnInit {

    spinner: any = false;
    leaveData: any = {
        // deptId: 1,
        // leaveTypeName: 'Test Leavetype',
        // leaveShortName: 'Test Leavetype Short Name',
        // leaveShortCode: 'Test Leavetype Short Code',
        // description: 'Test leave data',
        // status: 1
    };
    pageId: any = null;
    transformData: any = null;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public leavetypeApiService: LeavetypeApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.route.params.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['lt_Id']) : null;
        });
        this.getLeavetypeData();
    }

    goBackTo() {
        this.router.navigate(['/manage-leavetype']);
    }

    getLeavetypeData() {
        this.spinner = true;
        this.leavetypeApiService.geLeavetypeDataById(Number(this.pageId)).subscribe(async (response: any) => {
            console.log('Get leave type data response isss', response);
            if (response && response.success) {
                this.leaveData = response.data || {};
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
