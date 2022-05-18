import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/api-services/auth-user.service';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { bs4Toast } from 'src/assets/js/bs4-toast';
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
  timerRes: any = null;
  isExpired: any = false;

  empLatestLeaves: any = [
    { userId: 1, employeeId: 'EMP001', employeeName: 'employeeOne', profileImage: null, status: 1, leaveTypeId: 1, leaveTypeName: 'Casual Leave', leaveAppliedDate: '2021-01-10', leaveStatus: 1 },
    { userId: 2, employeeId: 'EMP003', employeeName: 'employeeThree', profileImage: null, status: 1, leaveTypeId: 1, leaveTypeName: 'Casual Leave', leaveAppliedDate: '2021-01-13', leaveStatus: 0 },
    { userId: 3, employeeId: 'EMP004', employeeName: 'employeeFour', profileImage: null, status: 1, leaveTypeId: 2, leaveTypeName: 'Sick Leave', leaveAppliedDate: '2021-01-25', leaveStatus: 2 },
    { userId: 4, employeeId: 'EMP006', employeeName: 'employeeSix', profileImage: null, status: 1, leaveTypeId: 3, leaveTypeName: 'Medical Leave', leaveAppliedDate: '2021-02-02', leaveStatus: 1 },
    { userId: 5, employeeId: 'EMP010', employeeName: 'employeeTen', profileImage: null, status: 1, leaveTypeId: 4, leaveTypeName: 'Annual Leave', leaveAppliedDate: '2021-02-06', leaveStatus: 0 },
  ];

  constructor(
    public authUserService: AuthUserService
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
    // })
  }

}
