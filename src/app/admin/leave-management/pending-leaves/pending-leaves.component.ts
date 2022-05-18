import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-leaves',
  templateUrl: './pending-leaves.component.html',
  styleUrls: ['./pending-leaves.component.css']
})
export class PendingLeavesComponent implements OnInit {

  empPendingLeaves: any = [
    {userId: 2, employeeId: 'EMP003', employeeName: 'employeeThree', leaveTypeName: 'Sick leave', leaveAppliedDate: '2021-02-02', status: 0},
    {userId: 6, employeeId: 'EMP010', employeeName: 'employeeTen', leaveTypeName: 'Leave without pay', leaveAppliedDate: '2021-03-16', status: 0}
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
