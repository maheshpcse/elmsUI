import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-leaves',
  templateUrl: './apply-leaves.component.html',
  styleUrls: ['./apply-leaves.component.css']
})
export class ApplyLeavesComponent implements OnInit {

  leaveTypeName: any = null;
  leaveTypeId: any = null;
  leaveStartDate: any = null;
  leaveEndDate: any = null;
  leaveReason: any = null;

  constructor() { }

  ngOnInit() {
  }

}
