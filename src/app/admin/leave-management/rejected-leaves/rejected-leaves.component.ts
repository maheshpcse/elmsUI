import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejected-leaves',
  templateUrl: './rejected-leaves.component.html',
  styleUrls: ['./rejected-leaves.component.css']
})
export class RejectedLeavesComponent implements OnInit {

  empRejectedLeaves: any = [
    {userId: 3, employeeId: 'EMP004', employeeName: 'employeeFour', leaveTypeName: 'Sick leave', leaveAppliedDate: '2021-02-10', status: 2},
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
