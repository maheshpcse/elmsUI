import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrls: ['./all-leaves.component.css']
})
export class AllLeavesComponent implements OnInit {

  empAllLeaves: any = [
    {userId: 1, employeeId: 'EMP002', employeeName: 'employeeTwo', leaveTypeName: 'Earned leave', leaveAppliedDate: '2021-02-01', status: 1},
    {userId: 2, employeeId: 'EMP003', employeeName: 'employeeThree', leaveTypeName: 'Sick leave', leaveAppliedDate: '2021-02-02', status: 0},
    {userId: 3, employeeId: 'EMP004', employeeName: 'employeeFour', leaveTypeName: 'Sick leave', leaveAppliedDate: '2021-02-10', status: 2},
    {userId: 4, employeeId: 'EMP006', employeeName: 'employeeSix', leaveTypeName: 'Casual leave', leaveAppliedDate: '2021-03-05', status: 1},
    {userId: 5, employeeId: 'EMP009', employeeName: 'employeeNine', leaveTypeName: 'Leave without pay', leaveAppliedDate: '2021-03-07', status: 1},
    {userId: 6, employeeId: 'EMP010', employeeName: 'employeeTen', leaveTypeName: 'Leave without pay', leaveAppliedDate: '2021-03-16', status: 0}
  ];

  filterargs = {employeeId: 'EMP010'};

  jsonFilter: any = this.empAllLeaves[0];

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  onChangeRoute(path?: any) {
    this.router.navigate([`${path}`]);
  }
}
