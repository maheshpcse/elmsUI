import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-leavetypes',
  templateUrl: './add-leavetypes.component.html',
  styleUrls: ['./add-leavetypes.component.css']
})
export class AddLeavetypesComponent implements OnInit {

  leaveTypeName: any = null;
  leaveTypeShortName: any = null;
  leaveTypeShortCode: any = null;
  leaveTypeDescription: any = null;
  submitReq: any = 0;

  constructor() { }

  ngOnInit() {
  }

  createData() {
    const tempLeaveType = this.leaveTypeName.split('')

    let tempShortName: any = []
    if (tempLeaveType && tempLeaveType.length && Number(tempLeaveType[0].charCodeAt(0)) !== 32) {
      tempShortName.push(tempLeaveType[0].toUpperCase());
    }
    let spaceData: any = {};
    let index: any = 0;

    for (const item of tempLeaveType) {
      if (Number(item.charCodeAt(0)) === 32) {
        spaceData[index + 1] = index + 1;
      }
      index = index + 1;
    }

    for (const [key, value] of Object.entries(spaceData)) {
      if (tempLeaveType[key]) {
        tempShortName.push(tempLeaveType[key].toUpperCase());
      }
    }
    console.log('tempShortName isss', tempShortName);

    if (tempShortName && tempShortName.length > 0) {
      this.leaveTypeShortName = (tempShortName.join("")).toString();
      this.leaveTypeShortCode = (`${tempShortName.join("")}_LEAVETYPE`).toString();
    } else {
      this.leaveTypeShortName = null;
      this.leaveTypeShortCode = null;
    }
  }

  saveData(){
    this.submitReq = 1;
    setTimeout(() => {
      this.submitReq = 2;
    }, 2000);
  }

}
