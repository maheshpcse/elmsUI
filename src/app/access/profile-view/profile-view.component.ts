import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  employeeData: any = {
    userId: null,
    employeeId: null,
    firstName: null,
    middleName: null,
    lastName: null,
    userName: null,
    email: null,
    address: null,
    cityName: null,
    stateName: null,
    countryName: null,
    zipCode: null,
    phoneNumber: null,
    dateOfBirth: null,
    designation: null,
    department: null,
    dateOfJoining: null
  };

  constructor() {}

  ngOnInit() {
    this.employeeData = {
      userId: 1,
      employeeId: 'EMP001',
      firstName: 'Pachapalam',
      middleName: 'Mahesh',
      lastName: '',
      userName: 'Mahesh Pm',
      email: 'maheshpm1599@gmail.com',
      address: 'Ram nagar, GVMC',
      cityName: 'Visakapatnam',
      stateName: 'Andhra Pradesh',
      countryName: 'India',
      zipCode: 530002,
      phoneNumber: 8886197968,
      dateOfBirth: '1997-08-04',
      designation: 'Software Developer',
      department: 'IT/Software',
      dateOfJoining: '2019-01-08'
    };
  }
  
}
