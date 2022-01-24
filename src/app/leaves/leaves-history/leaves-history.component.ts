import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaves-history',
  templateUrl: './leaves-history.component.html',
  styleUrls: ['./leaves-history.component.css']
})
export class LeavesHistoryComponent implements OnInit {

  empLeavesData: any = [
    { leave_id: 1, leaveTypeId: 1, leaveTypeName: 'Casual Leave', leaveStartDate: '2022-01-02', leaveEndDate: '2022-01-04', leaveReason: 'Going to home', leaveAppliedDate: '2022-01-01', remarks: 'permission granted', status: 1},
    { leave_id: 2, leaveTypeId: 1, leaveTypeName: 'Casual Leave', leaveStartDate: '2022-01-11', leaveEndDate: '2022-01-13', leaveReason: 'Sankranthi festival', leaveAppliedDate: '2022-01-10', remarks: 'permission granted', status: 1},
    { leave_id: 3, leaveTypeId: 2, leaveTypeName: 'Sick Leave', leaveStartDate: '2021-12-10', leaveEndDate: '2022-01-11', leaveReason: 'Health checkup', leaveAppliedDate: '2021-12-09', remarks: 'permission not granted', status: 0},
    { leave_id: 4, leaveTypeId: 3, leaveTypeName: 'Comp off', leaveStartDate: '2021-12-24', leaveEndDate: '2021-12-24', leaveReason: 'Christmas celebrations', leaveAppliedDate: '2021-12-23', remarks: 'permission not granted', status: 0},
    { leave_id: 5, leaveTypeId: 4, leaveTypeName: 'Medical Leave', leaveStartDate: '2021-11-02', leaveEndDate: '2021-11-03', leaveReason: 'Eye care appointment', leaveAppliedDate: '2021-11-01', remarks: 'permission granted', status: 1},
  ];

  constructor() { }

  ngOnInit() {
  }

}
