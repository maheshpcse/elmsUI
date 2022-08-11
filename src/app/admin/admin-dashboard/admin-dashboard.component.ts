import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { AdminDashboardApisService } from 'src/app/api-services/admin-dashboard-apis.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { bs4Toast } from 'src/assets/js/bs4-toast';
import { takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import * as _ from 'underscore';
declare var $: any;

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    // ngUnSubscribe: any = new Subject();
    // rxjsUntilTimer: any  = timer(1000, 1000);
    spinner: any = false;
    countSpinner: any = false;
    timerRes: any = null;
    isExpired: any = false;
    empLatestLeaves: any = [
        { userId: 1, employeeId: 'EMP001', employeeName: 'employeeOne', profileImage: null, status: 1, leaveTypeId: 1, leaveTypeName: 'Casual Leave', leaveAppliedDate: '2021-01-10', leaveStatus: 1 },
        { userId: 2, employeeId: 'EMP003', employeeName: 'employeeThree', profileImage: null, status: 1, leaveTypeId: 1, leaveTypeName: 'Casual Leave', leaveAppliedDate: '2021-01-13', leaveStatus: 0 },
        { userId: 3, employeeId: 'EMP004', employeeName: 'employeeFour', profileImage: null, status: 1, leaveTypeId: 2, leaveTypeName: 'Sick Leave', leaveAppliedDate: '2021-01-25', leaveStatus: 2 },
        { userId: 4, employeeId: 'EMP006', employeeName: 'employeeSix', profileImage: null, status: 1, leaveTypeId: 3, leaveTypeName: 'Medical Leave', leaveAppliedDate: '2021-02-02', leaveStatus: 1 },
        { userId: 5, employeeId: 'EMP010', employeeName: 'employeeTen', profileImage: null, status: 1, leaveTypeId: 4, leaveTypeName: 'Annual Leave', leaveAppliedDate: '2021-02-06', leaveStatus: 0 },
    ];
    dashboardCounts = {
        employees: 0,
        departments: 0,
        leavetypes: 0
    }

    interviewForm: any = [];
    finalInterviewForm: any = [];

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        public adminDashboardApiService: AdminDashboardApisService,
        public toastr: ToastrManager
    ) { }

    ngOnInit() {
        // bs4Toast.show('Hello Admin', 'Welcome To <strong>Employee Leave Management System</strong>',
        //   {
        //     delay: 2000,
        //     icon: {
        //       type: 'fontawesome',
        //       class: 'fa-user'
        //     }
        //   });

        // bs4Toast.show('Toast with Icon', 'This is toast with buttons example.',
        //   {
        //     delay: 2000,
        //     icon: {
        //       type: 'image',
        //       src: 'https://via.placeholder.com/150'
        //     }
        //   });
        // setTimeout(() => {
        //   $('#welome-alert').alert('close');
        // }, 2000);

        // this.rxjsUntilTimer.pipe(takeUntil(this.ngUnSubscribe)).subscribe((res: any) => {
        //   this.timerRes = res;
        //   if (this.timerRes >= 10) {
        //     this.ngUnSubscribe.next();
        //     this.ngUnSubscribe.complete();
        //     this.isExpired = true;
        //   }
        // });
        this.getLeavetypeData();

        const result = [
            {
                "id": 4,
                "question": "Would you recommend TJGI to a friend as a good place to work?",
                "question_answer_type": "rating",
                "is_subquestions": "NO",
                "status": "true",
                "added_by": null,
                "added_date": "19-05-2022 11:53:28",
                "updated_by": null,
                "updated_date": null,
                "subquestionlistitem": []
            },
            {
                "id": 5,
                "question": "How would you rate the following?",
                "question_answer_type": "textbox",
                "is_subquestions": "YES",
                "status": "true",
                "added_by": null,
                "added_date": "19-05-2022 11:54:15",
                "updated_by": null,
                "updated_date": null,
                "subquestionlistitem": [
                    {
                        "id": 1,
                        "question_id": "5",
                        "sub_question": "Performance reviews",
                        "sub_question_answer_type": "textRadio",
                        "added_by": null,
                        "added_date": "19-05-2022 12:15:18",
                        "updated_by": null,
                        "updated_date": null
                    },
                    {
                        "id": 2,
                        "question_id": "5",
                        "sub_question": "Opportunity for advancement & growth",
                        "sub_question_answer_type": "textRadio",
                        "added_by": null,
                        "added_date": "19-05-2022 12:16:28",
                        "updated_by": null,
                        "updated_date": null
                    },
                    {
                        "id": 3,
                        "question_id": "5",
                        "sub_question": "Training received",
                        "sub_question_answer_type": "textRadio",
                        "added_by": null,
                        "added_date": "19-05-2022 12:16:41",
                        "updated_by": null,
                        "updated_date": null
                    },
                    {
                        "id": 4,
                        "question_id": "5",
                        "sub_question": "Your job responsibilities",
                        "sub_question_answer_type": "textRadio",
                        "added_by": null,
                        "added_date": "19-05-2022 12:16:53",
                        "updated_by": null,
                        "updated_date": null
                    },
                    {
                        "id": 5,
                        "question_id": "5",
                        "sub_question": "Support you received from superiors",
                        "sub_question_answer_type": "textRadio",
                        "added_by": null,
                        "added_date": "19-05-2022 12:17:05",
                        "updated_by": null,
                        "updated_date": null
                    },
                    {
                        "id": 6,
                        "question_id": "5",
                        "sub_question": "Your compensation & benefits",
                        "sub_question_answer_type": "textRadio",
                        "added_by": null,
                        "added_date": "19-05-2022 12:18:37",
                        "updated_by": null,
                        "updated_date": null
                    },
                    {
                        "id": 7,
                        "question_id": "5",
                        "sub_question": "Internal Communication",
                        "sub_question_answer_type": "textRadio",
                        "added_by": null,
                        "added_date": "19-05-2022 12:18:51",
                        "updated_by": null,
                        "updated_date": null
                    }
                ]
            }
        ];

        for (const item of result) {
            if (item['is_subquestions'] === 'NO') {
                const newItem = {
                    "exit_interview_id": null,
                    "question_id": item['id'],
                    "answer": null,
                    "sub_question_id": null,
                }
                this.interviewForm.push({
                    [item['id']]: newItem
                });
            } else {
                const subItemsArr = [];
                for (const data of item['subquestionlistitem']) {
                    subItemsArr.push({
                        "exit_interview_id": null,
                        "question_id": item['id'],
                        "answer": null,
                        "sub_question_id": data['id'],
                    });
                }
                this.interviewForm.push({
                    [item['id']]: subItemsArr
                });
            }
        }
        console.log('interviewForm isss', this.interviewForm);

        for (const item of this.interviewForm) {
            const keyId = Object.keys(item)[0];
            if (!item[keyId].hasOwnProperty('length')) {
                this.finalInterviewForm.push(...Object.values(item));
            } else {
                for (const data of Object.values(item)) {
                    this.finalInterviewForm.push(...Object.values(data));
                }
            }
        }

        console.log('finalInterviewForm isss', this.finalInterviewForm);
    }

    getLeavetypeData() {
        this.countSpinner = true;
        this.adminDashboardApiService.getAdminDashboardCountsData().subscribe(async (response: any) => {
            console.log('Get admin dashboard counts data response isss', response);
            if (response && response.success) {
                this.dashboardCounts = response.data || this.dashboardCounts;
            } else {
                this.toastr.errorToastr(response.message);
            }
            this.countSpinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.countSpinner = false;
        });
    }

}
