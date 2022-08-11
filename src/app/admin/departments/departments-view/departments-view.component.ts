import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { DepartmentApisService } from 'src/app/api-services/department-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';

@Component({
    selector: 'app-departments-view',
    templateUrl: './departments-view.component.html',
    styleUrls: ['./departments-view.component.css']
})
export class DepartmentsViewComponent implements OnInit {

    spinner: any = false;
    deptData: any = {
        // deptId: 1,
        // departmentName: 'Test Department',
        // departmentShortName: 'Test Department Short Name',
        // departmentShortCode: 'Test Department Short Code',
        // status: 1
    };
    pageId: any = null;
    transformData: any = null;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public departmentApiService: DepartmentApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        this.route.params.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['deptId']) : null;
        });
        this.getDepartmentData();
    }

    goBackTo() {
        this.router.navigate(['/manage-department']);
    }

    getDepartmentData() {
        this.spinner = true;
        this.departmentApiService.getDepartmentDataById(Number(this.pageId)).subscribe(async (response: any) => {
            console.log('Get department data response isss', response);
            if (response && response.success) {
                this.deptData = response.data || {};
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
