import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/app-services/employee_columns';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';
import * as _ from 'underscore';
declare var $: any;

@Component({
  selector: 'app-bulk-upload-employee',
  templateUrl: './bulk-upload-employee.component.html',
  styleUrls: ['./bulk-upload-employee.component.css']
})
export class BulkUploadEmployeeComponent implements OnInit {

  formType: any = 'page';
  uploadSpinner: any = false;
  downloadSpinner: any = false;

  employeesList: any = [
    {userId: 1, emp_id: 'EMP001', fullName: 'employeeOne', designation: 'Web Developer', department: 'IT/Web', mobile: '9000000143', status: 1},
    {userId: 2, emp_id: 'EMP002', fullName: 'employeeTwo', designation: 'Soft Developer', department: 'IT/Software', mobile: '7661876696', status: 0},
    {userId: 3, emp_id: 'EMP003', fullName: 'employeeThree', designation: 'Angular Developer', department: 'IT/Web', mobile: '9949393483', status: 1},
    {userId: 4, emp_id: 'EMP004', fullName: 'employeeFour', designation: 'Node.js Developer', department: 'IT/Web', mobile: '8332005225', status: 2},
    {userId: 5, emp_id: 'EMP005', fullName: 'employeeFive', designation: 'Andriod Developer', department: 'IT/Hardware', mobile: '9876512340', status: 1},
    {userId: 6, emp_id: 'EMP006', fullName: 'employeeSix', designation: 'IOT Developer', department: 'IT/Hardware', mobile: '9608889843', status: 0},
  ];

  constructor() { }

  ngOnInit() {
  }

  selectOption(type?: any) {
    if (type === 'table') {
      this.uploadSpinner = true;
      setTimeout(() => {
      this.uploadSpinner = false;
      this.formType = type;
      }, 3000);
    } else if (type === 'page' || type === 'form') {
      this.formType = type;
    } else {
      this.downloadSpinner = true;
      setTimeout(() => {
        this.downloadSpinner = false;
      }, 3000);
    }
  }

  downloadExcelFile() {
    this.downloadSpinner = true;

    // create new Excel work book
    const workbook = new Excel.Workbook();

    // add name to sheet
    const worksheet = workbook.addWorksheet("Employee Data");

    // add column names
    worksheet.columns = Employees.Columns;

    // Set Row 1 to Comic Sans.
    worksheet.getRow(1).font = { size: 12, bold: true };

    // set downloadable file name
    const fileName = `Employees_${moment().format('YYYYMMDD_HH_MM_ss')}`;

    // add data and file name and download
    workbook.xlsx.writeBuffer().then(async (data?: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // fs.saveAs(blob, fileName + '-' + new Date().valueOf() + '.xlsx');
      fs.saveAs(blob, fileName, '.xlsx');
    });
    this.downloadSpinner = false;
  }

}
