import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-leaves',
  templateUrl: './approved-leaves.component.html',
  styleUrls: ['./approved-leaves.component.css']
})
export class ApprovedLeavesComponent implements OnInit {

  empApprovedLeaves: any = [
    {userId: 1, employeeId: 'EMP002', employeeName: 'employeeTwo', leaveTypeName: 'Earned leave', leaveAppliedDate: '2021-02-01', status: 1},
    {userId: 4, employeeId: 'EMP006', employeeName: 'employeeSix', leaveTypeName: 'Casual leave', leaveAppliedDate: '2021-03-05', status: 1},
    {userId: 5, employeeId: 'EMP009', employeeName: 'employeeNine', leaveTypeName: 'Leave without pay', leaveAppliedDate: '2021-03-07', status: 1},
  ];

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  onChangeRoute(path?: any) {
    this.router.navigate([`${path}`]);
  }

}
