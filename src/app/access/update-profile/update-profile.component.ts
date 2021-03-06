import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  employeeId: any = null;
  firstName: any = null;
  middleName: any = null;
  lastName: any = null;
  userName: any = null;
  email: any = null;
  address: any = null;
  cityName: any = null;
  stateName: any = null;
  countryName: any = null;
  zipCode: any = null;
  phoneNumber: any = null;
  dateOfBirth: any = null;
  designation: any = null;
  department: any = null;
  dateOfJoining: any = null;

  constructor() { }

  ngOnInit() {
    this.employeeId = 'EMP001';
    this.firstName = 'Pachapalam';
    this.middleName = 'Mahesh';
    this.lastName = '';
    this.userName = 'Mahesh Pm';
    this.email = 'maheshpm1599@gmail.com';
    this.address = 'Ram nagar, GVMC';
    this.cityName = 'Visakapatnam';
    this.stateName = 'Andhra Pradesh';
    this.countryName = 'India';
    this.zipCode = 530002;
    this.phoneNumber = 8886197968;
    this.dateOfBirth = '1997-08-04';
    this.designation = 'Software Developer';
    this.department = 'IT/Software';
    this.dateOfJoining = '2019-08-01';
  }

}
