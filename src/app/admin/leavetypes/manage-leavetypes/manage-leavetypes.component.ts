import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-leavetypes',
  templateUrl: './manage-leavetypes.component.html',
  styleUrls: ['./manage-leavetypes.component.css']
})
export class ManageLeavetypesComponent implements OnInit {

  leaveTypesList: any = [
    {leaveTypeId: 1, name: 'Earned leave', shortName: 'earned_leave', shortCode: 'EL', status: 1, created_at: '2021-01-02'},
    {leaveTypeId: 2, name: 'Sick leave', shortName: 'sick_leave', shortCode: 'SL', status: 0, created_at: '2021-01-02'},
    {leaveTypeId: 3, name: 'Casual leave', shortName: 'casual_leave', shortCode: 'CL', status: 1, created_at: '2021-02-03'},
    {leaveTypeId: 4, name: 'Leave without pay', shortName: 'leave_without_pay', shortCode: 'LWP', status: 1, created_at: '2021-02-04'},
    {leaveTypeId: 5, name: 'Maternity leave', shortName: 'maternity_leave', shortCode: 'ML', status: 0, created_at: '2021-03-04'},
    {leaveTypeId: 6, name: 'Paternity leave', shortName: 'paternity_leave', shortCode: 'PL', status: 1, created_at: '2021-03-05'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
