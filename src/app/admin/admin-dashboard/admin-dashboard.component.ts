import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  empLatestLeaves: any = [
    { userId: 1, employeeId: 'EMP001', employeeName: 'employeeOne', profileImage: null, status: 1, leaveTypeId: 1, leaveTypeName: 'Casual Leave', leaveAppliedDate: '2021-01-10', leaveStatus: 1 },
    { userId: 1, employeeId: 'EMP003', employeeName: 'employeeThree', profileImage: null, status: 1, leaveTypeId: 1, leaveTypeName: 'Casual Leave', leaveAppliedDate: '2021-01-13', leaveStatus: 0 },
    { userId: 1, employeeId: 'EMP004', employeeName: 'employeeFour', profileImage: null, status: 1, leaveTypeId: 2, leaveTypeName: 'Sick Leave', leaveAppliedDate: '2021-01-25', leaveStatus: 2 },
    { userId: 1, employeeId: 'EMP006', employeeName: 'employeeSix', profileImage: null, status: 1, leaveTypeId: 3, leaveTypeName: 'Medical Leave', leaveAppliedDate: '2021-02-02', leaveStatus: 1 },
    { userId: 1, employeeId: 'EMP010', employeeName: 'employeeTen', profileImage: null, status: 1, leaveTypeId: 4, leaveTypeName: 'Annual Leave', leaveAppliedDate: '2021-02-06', leaveStatus: 0 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
