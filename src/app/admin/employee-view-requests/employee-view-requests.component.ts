import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employee-view-requests',
  templateUrl: './employee-view-requests.component.html',
  styleUrls: ['./employee-view-requests.component.css']
})
export class EmployeeViewRequestsComponent implements OnInit {

  leaveType: any = 'Casual Leave';

  constructor() { }

  ngOnInit() { }
  
}
