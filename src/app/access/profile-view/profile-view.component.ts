import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  employeeData: any = {
    employeeId: null,
    firstName: null,
    middleName: null,
    lastName: null,
    userName: null,
    emailId: null,
    address: null,
    cityName: null,
    stateName: null,
    countryName: null,
    zipCode: null,
    phoneNumber: null,
    dateOfBirth: null,
    designation: null,
    department: null,
    registrationDate: null
  };

  constructor() {}

  ngOnInit() {
    this.employeeData = {
      employeeId: 'EMP001',
      firstName: 'Pachapalam',
      middleName: 'Mahesh',
      lastName: '',
      userName: 'Mahesh Pm',
      emailId: 'maheshpm1599@gmail.com',
      address: 'Ram nagar, GVMC',
      cityName: 'Visakapatnam',
      stateName: 'Andhra Pradesh',
      countryName: 'India',
      zipCode: 530002,
      phoneNumber: 8886197968,
      dateOfBirth: '1997-08-04',
      designation: 'Software Developer',
      department: 'IT/Software',
      registrationDate: '2019-01-08'
    };
  }
  
}
