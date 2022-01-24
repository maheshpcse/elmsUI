import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentPassword: any = null;
  newPassword: any = null;
  confirmPassword: any = null;
  
  constructor() { }

  ngOnInit() {
  }

}
